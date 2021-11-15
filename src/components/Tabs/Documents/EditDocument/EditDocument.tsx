import { FolderModel } from 'services';

import Box from '@mui/material/Box';
import FolderPicker from 'components/FolderPicker';
import Input from 'components/Input';

import { useStyles } from './style';

interface EditDocumentModel {
  rootFolder: FolderModel;
  selectedDoc: string;
  fetchFolders(): Promise<void>;
  onClose(): void;
}

const EditDocument: React.FC<EditDocumentModel> = ({
  rootFolder,
  selectedDoc,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <div>
      <h3 className={classes.title}>Edit document</h3>
      <Box marginBottom="10px">
        <span>Document Name</span>
        <Input />
      </Box>
      <Box marginBottom="10px">
        <span>Parent Folder Name</span>
        {/* <FolderPicker /> */}
      </Box>
    </div>
  );
};

export default EditDocument;
