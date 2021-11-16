import Picker from 'components/controls/Picker';
import FolderList from './FolderList';

export interface FolderPickerItemModel {
  id: string;
  name: string;
  folders: FolderPickerItemModel[];
  depth: number;
}

export interface SelectedFolder {
  id: string;
  name: string;
  depth: number;
}

interface FolderPickerProps {
  edit?: boolean;
  options: FolderPickerItemModel[];
  selected: SelectedFolder | null;
  onChange(folder: SelectedFolder): void;
  loadingId?: string | null;
  saveFolderName(id: string, name: string): Promise<any>;
}

const FolderPicker: React.FC<FolderPickerProps> = ({
  edit = true,
  selected,
  options,
  onChange,
  saveFolderName,
}) => {
  const renderValue = () => (selected ? selected.name : null);

  const renderBody = (onClose: () => void) => (
    <FolderList
      edit={edit}
      onChange={onChange}
      onClose={onClose}
      selected={selected}
      options={options}
      saveFolderName={saveFolderName}
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
