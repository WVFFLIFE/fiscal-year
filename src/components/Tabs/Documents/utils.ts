import {
  FolderModel,
  DocumentModel,
  SortModel,
  EntityPublishModel,
} from 'models';
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
    } else {
      amount.docs += 1;
    }
  }

  amount.folders = entities.length;

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

export function getInnerDocuments(list: (FolderModel | DocumentModel)[]) {
  let documents: DocumentModel[] = [];

  list.forEach((item) => {
    if (isFolder(item)) {
      documents.push(...(item as FolderModel).Documents);
      documents.push(...getInnerDocuments((item as FolderModel).Folders));
    } else {
      documents.push(item as DocumentModel);
    }
  });

  return documents;
}

export function isPublishedAnyInnerDocument(folder: FolderModel) {
  const documents = getInnerDocuments([folder]);

  return documents.some((doc) => doc.IsPublished);
}

export function getDocuments(list: (FolderModel | DocumentModel)[]) {
  return list.filter((entity) => !isFolder(entity)) as DocumentModel[];
}

export function getPublishedEntities(
  list: DocumentModel[],
  published: boolean
): EntityPublishModel[] {
  return list
    .filter((document) =>
      published ? !document.IsPublished : document.IsPublished
    )
    .map((document) => ({
      id: document.Id,
      type: 'doc',
      published: document.IsPublished,
    }));
}

export function getEntitiesType(
  selectedItems: (DocumentModel | FolderModel)[]
) {
  return selectedItems.reduce((acc, next) => {
    const folder = isFolder(next);
    if (acc) {
      if (acc === 'doc') {
        return folder ? 'both' : 'doc';
      }

      if (acc === 'folder') {
        return folder ? 'folder' : 'both';
      }

      return 'both';
    } else {
      return folder ? 'folder' : 'doc';
    }
  }, null as 'doc' | 'folder' | 'both' | null);
}

function findFolderInRootFolder(
  rootFolder: FolderModel,
  folder: FolderModel
): FolderModel | null {
  if (rootFolder.Id === folder.Id) return rootFolder;

  let newFolder: FolderModel | null = null;

  for (let innerFolder of rootFolder.Folders) {
    newFolder = findFolderInRootFolder(innerFolder, folder);
    if (newFolder) break;
  }

  return newFolder;
}

export function updateBreadcrumbsList(
  rootFolder: FolderModel,
  breadcrumbsList: FolderModel[],
  rootFolderName = 'Home'
) {
  if (breadcrumbsList.length <= 1) {
    return [
      {
        ...rootFolder,
        Name: rootFolderName,
        Folders: limitFoldersDepth(rootFolder.Folders),
      },
    ];
  }

  return breadcrumbsList.map((folder) => {
    return findFolderInRootFolder(rootFolder, folder) || folder;
  });
}

export function getAttributeTitle(internalName: string) {
  switch (internalName) {
    case 'Viewing_x0020_rights':
      return '#tab.documents.upload.viewingrights';
    case 'Information_x0020_Group':
      return '#tab.documents.upload.informationgroup';
    case 'Service_x002f_Process':
      return '#tab.documents.upload.serviceprocess';
    default:
      return '';
  }
}
