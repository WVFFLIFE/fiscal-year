import { FolderModel, DocumentModel } from 'services';
import isFolder from './isFolder';

export default function extractDocs(list: (FolderModel | DocumentModel)[]) {
  let docIds: string[] = [];

  for (let entity of list) {
    if (isFolder(entity)) {
      const newList = [
        ...(entity as FolderModel).Folders,
        ...(entity as FolderModel).Documents,
      ];
      docIds.push(...extractDocs(newList));
    } else {
      docIds.push(entity.Id);
    }
  }

  return docIds;
}
