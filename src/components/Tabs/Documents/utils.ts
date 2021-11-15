import { FolderModel } from 'services';
import { FolderPickerItemModel } from 'models';

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
  folders: FolderModel[]
): FolderPickerItemModel[] {
  return folders.map((folder) => {
    return {
      id: folder.Id,
      name: folder.Name,
      folders: folder.Folders.length ? transformFolders(folder.Folders) : [],
    };
  });
}
