import { FolderModel } from './FolderPicker';

export function isChild(
  rootFolder: FolderModel,
  selectedFolder: FolderModel | null
): boolean {
  if (!selectedFolder) return false;
  if (rootFolder.Id === selectedFolder.Id) return true;

  return rootFolder.Folders.some((folder) => isChild(folder, selectedFolder));
}
