import { FolderModel, DocumentModel, SortModel } from 'models';
import { SettledResponse } from 'services';

import isFolder from 'utils/isFolder';
import sort from 'utils/sort';

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

export function prepareData(folder: FolderModel, sortParams: SortModel) {
  let sortedFolders = sort(folder.Folders, sortParams);
  let sortedDocuments = sort(folder.Documents, sortParams);

  if (sortParams.order === 'asc') {
    return [...sortedFolders, ...sortedDocuments];
  } else {
    return [...sortedDocuments, ...sortedFolders];
  }
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

export function stringsGroupToArray(val: string) {
  return val ? val.split(', ') : [];
}

export function isAnySucceed(res: SettledResponse) {
  return res.some(
    (item) => item.status === 'fulfilled' && item.value.IsSuccess
  );
}

export function getFolderDepth(
  currentFolder: FolderModel,
  selectedFolder: FolderModel,
  depth = 0
): number {
  if (currentFolder.Id === selectedFolder.Id) {
    return depth;
  }

  for (let folder of currentFolder.Folders) {
    if (folder.Id === selectedFolder.Id) {
      return depth + 1;
    } else {
      if (folder.Folders.length) {
        return getFolderDepth(folder, selectedFolder, depth);
      } else {
        continue;
      }
    }
  }

  return depth;
}
