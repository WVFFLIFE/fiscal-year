import { FolderModel, DocumentModel } from 'services';
import { EntityModel } from 'models';

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
  type: 'entity' | 'id',
  root = false
): (string | EntityModel)[] {
  let list = [];
  const folder = isFolder(item);
  const el =
    type === 'id'
      ? item.Id
      : ({ id: item.Id, type: folder ? 'folder' : 'doc' } as EntityModel);

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
