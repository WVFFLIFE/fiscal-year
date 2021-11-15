import MenuList from '@mui/material/MenuList';
import FolderItem from '../FolderItem';

import { SelectedFolder, FolderPickerItemModel } from '../FolderPicker';

import { useStyles } from './style';

interface FolderListProps {
  edit: boolean;
  onChange(newFolder: SelectedFolder): void;
  onClose(): void;
  selected: SelectedFolder | null;
  options: FolderPickerItemModel[];
  saveFolderName(id: string, name: string): Promise<any>;
}

const FolderList: React.FC<FolderListProps> = ({
  edit,
  onChange,
  onClose,
  selected,
  options,
  saveFolderName,
}) => {
  const classes = useStyles();

  const handleChange = (newFolder: SelectedFolder) => {
    onChange(newFolder);
    onClose();
  };

  return (
    <MenuList className={classes.root}>
      {options.map((item) => {
        return (
          <FolderItem
            key={item.id}
            folder={item}
            selected={selected}
            saveFolderName={saveFolderName}
            onChange={handleChange}
            edit={edit}
          />
        );
      })}
    </MenuList>
  );
};

export default FolderList;
