import { FolderModel, DocumentModel } from 'services';
import { EntityModel, EntityPublishModel } from 'models';

import isPublished from './isPublished';
import isFolder from './isFolder';

export default function buildFlatList(
  item: FolderModel | DocumentModel,
  type: 'id',
  root?: boolean
): string[];
export default function buildFlatList(
  item: FolderModel | DocumentModel,
  type: 'entity',
  root?: boolean
): EntityModel[];
export default function buildFlatList(
  item: FolderModel | DocumentModel,
  type: 'entity_published',
  root?: boolean
): EntityPublishModel[];
export default function buildFlatList(
  item: FolderModel | DocumentModel,
  type: 'entity' | 'id' | 'entity_published',
  root = false
): (string | EntityModel | EntityPublishModel)[] {
  let list = [];
  const folder = isFolder(item);
  const el =
    type === 'id'
      ? item.Id
      : type === 'entity'
      ? ({ id: item.Id, type: folder ? 'folder' : 'doc' } as EntityModel)
      : ({
          id: item.Id,
          type: folder ? 'folder' : 'doc',
          published: !!item.IsPublished,
        } as EntityPublishModel);

  if (folder) {
    let itemList = [
      ...(item as FolderModel).Folders,
      ...(item as FolderModel).Documents,
    ];
    if (!root) {
      list.push(el);
    }
    itemList.forEach((item) =>
      list.push(...buildFlatList(item, type as 'entity'))
    );
  } else {
    list.push(el);
  }

  return list;
}
