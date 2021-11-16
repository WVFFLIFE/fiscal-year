import { FolderModel, DocumentModel } from 'services';
import { FolderPickerItemModel } from 'models';

import isFolder from 'utils/isFolder';

export function limitFoldersDepth(
  folders: FolderModel[],
  totalDeep = 1,
  currentDeep = 0
) {
  let newFolders: FolderModel[] = [];

  for (let folder of folders) {
    let newFolder: FolderModel = {
      ...folder,
      Folders:
        currentDeep < totalDeep
          ? limitFoldersDepth(folder.Folders, totalDeep, currentDeep + 1)
          : [],
    };

    newFolders.push(newFolder);
  }

  return newFolders;
}

export function prepareData(folder: FolderModel) {
  return [...folder.Folders, ...folder.Documents];
}

export function transformFolders(
  folders: FolderModel[],
  depth = 0
): FolderPickerItemModel[] {
  return folders.map((folder) => {
    return {
      id: folder.Id,
      name: depth === 0 ? 'Home' : folder.Name,
      depth,
      folders: folder.Folders.length
        ? transformFolders(folder.Folders, depth + 1)
        : [],
    };
  });
}

export function countEntitiesAmount(entities: (FolderModel | DocumentModel)[]) {
  let amount = { docs: 0, folders: 0 };

  for (let entity of entities) {
    if (isFolder(entity)) {
      const list = [
        ...(entity as FolderModel).Documents,
        ...(entity as FolderModel).Folders,
      ];
      const innerAmount = countEntitiesAmount(list);

      amount.docs += innerAmount.docs;
      amount.folders += innerAmount.folders + 1;
    } else {
      amount.docs += 1;
    }
  }

  return amount;
}
