import { FolderModel } from '../FolderPicker';

import { isChild } from '../utils';

import MenuList from '@mui/material/MenuList';
import FolderItem from '../FolderItem';

import { useStyles } from './style';

interface FolderListProps {
  rootFolder: FolderModel;
  selectedFolder: FolderModel | null;
  onChangeFolder(newFolder: FolderModel, fodlerDepth: number): void;
  onChangeFolderName(folderId: string, newFolderName: string): Promise<void>;
  onClose(): void;
}

const FolderList: React.FC<FolderListProps> = ({
  rootFolder,
  selectedFolder,
  onChangeFolder,
  onChangeFolderName,
  onClose,
}) => {
  const classes = useStyles();

  const handleChange = (newFolder: FolderModel, folderDepth: number) => {
    onChangeFolder(newFolder, folderDepth);
    onClose();
  };

  const list = [rootFolder];

  return (
    <MenuList className={classes.root}>
      {list.map((folder) => {
        const open = isChild(rootFolder, selectedFolder);
        return (
          <FolderItem
            key={folder.Id}
            depth={0}
            open={open}
            folder={folder}
            selectedFolder={selectedFolder}
            onChangeFolder={handleChange}
            onChangeFolderName={onChangeFolderName}
          />
        );
      })}
    </MenuList>
  );
};

export default FolderList;
