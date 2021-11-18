import useFolderEditorData from './useFolderEditorData';
import { FolderModel } from 'models';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Input from 'components/Input';
import DialogError from 'components/DialogError';
import { InputLabel, CancelButton, ApplyButton } from 'components/Styled';

import { useStyles } from './style';

interface FolderEditorProps {
  selectedFolder: FolderModel;
  fetchFolders(): Promise<void>;
  onClose(showSuccessDialog?: boolean): void;
}

const FolderEditor: React.FC<FolderEditorProps> = ({
  selectedFolder,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();
  const { folderName, handleChangeFolderName, error, initError, save, saving } =
    useFolderEditorData(selectedFolder, fetchFolders, onClose);

  const disabledSaveBtn = !folderName || saving;

  return (
    <div>
      <h3 className={classes.title}>Edit Folder name</h3>
      <Box marginBottom="30px">
        <InputLabel>Folder Name</InputLabel>
        <Input value={folderName} onChange={handleChangeFolderName} />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <CancelButton onClick={() => onClose()}>Cancel</CancelButton>
        <ApplyButton
          className={classes.uploadBtn}
          disableRipple={saving}
          disabled={disabledSaveBtn}
          onClick={save}
          endIcon={
            saving ? (
              <CircularProgress size={20} className={classes.loader} />
            ) : undefined
          }
        >
          Save
        </ApplyButton>
      </Box>
      <DialogError error={error} initError={initError} />
    </div>
  );
};

export default FolderEditor;
