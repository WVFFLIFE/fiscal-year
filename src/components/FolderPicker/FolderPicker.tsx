import Picker from 'components/controls/Picker';
import FolderList from './FolderList';

export interface FolderModel {
  Name: string;
  Id: string;
  Folders: FolderModel[];
}

interface FolderPickerProps<T extends FolderModel> {
  /**
   * Main folder
   */
  rootFolder: T;
  /**
   * Selected folder from the list
   * of root folder
   */
  selectedFolder: T | null;
  onChangeFolder(newFolder: T, folderDepth: number): void;
  onChangeFolderName(folderId: string, newFolderName: string): Promise<void>;
}

const FolderPicker = <T extends FolderModel>({
  rootFolder,
  selectedFolder,
  onChangeFolder,
  onChangeFolderName,
}: FolderPickerProps<T>) => {
  const renderValue = () => (selectedFolder ? selectedFolder.Name : null);

  const renderBody = (onClose: () => void) => (
    <FolderList
      rootFolder={rootFolder}
      selectedFolder={selectedFolder}
      onChangeFolder={onChangeFolder}
      onChangeFolderName={onChangeFolderName}
      onClose={onClose}
    />
  );

  return (
    <Picker
      fullWidth
      placeholder="- Select existing folder -"
      renderValue={renderValue}
      renderBody={renderBody}
    />
  );
};

export default FolderPicker;
