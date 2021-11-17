import { useMemo } from 'react';
import useUploadFormData from './useUploadFormData';
import { SelectedAttributesModel, FolderModel } from 'models';

import FolderPicker from 'components/FolderPicker';
import CheckboxControl from 'components/CheckboxControl';
import Box from '@mui/material/Box';
import {
  IconButton,
  ApplyButton,
  CancelButton,
  InputLabel,
} from 'components/Styled';
import Button from 'components/Button';
import Input from 'components/Input';
import Dropzone from 'components/Dropzone';
import FilesList from 'components/FilesList';
import CheckboxGroup from 'components/CheckboxGroup';
import DialogError from 'components/DialogError';
import { PlusIcon, CloseIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

interface UploadFormProps {
  rootFolder: FolderModel;
  fetchFolders(): Promise<any>;
  onClose(val?: string): void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  rootFolder,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();

  const {
    attributes,
    error,
    loading,
    uploadFlag,
    overwrite,
    selectedAttributes,
    handleChangeAttribute,
    newFolder,
    selectedFolder,
    selectedFolderDepth,
    selectedFiles,
    handleChangeSelectedFolder,
    handleSelectFiles,
    handleRemoveFile,
    handleSaveNewFolderName,
    handleAddNewFolder,
    handleChangeNewFolderName,
    handleRemoveNewFolder,
    handleChangeOverwriteCheckbox,
    upload,
    initErrors,
  } = useUploadFormData(fetchFolders, onClose);

  const disabledDeployBtn =
    !selectedFiles.length || uploadFlag || !selectedFolder;

  return (
    <>
      <div>
        <h3 className={classes.title}>Upload file</h3>
        <p className={classes.description}>
          Select an existing folder or create a new one if needed
        </p>
        {loading ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <>
            <Box marginBottom="10px">
              <InputLabel>Parent Folder Name</InputLabel>
              <FolderPicker
                rootFolder={rootFolder}
                selectedFolder={selectedFolder}
                onChangeFolder={handleChangeSelectedFolder}
                onChangeFolderName={handleSaveNewFolderName}
              />
            </Box>
            <Button
              disabled={
                !!(
                  newFolder.show ||
                  (selectedFolderDepth && selectedFolderDepth >= 2)
                )
              }
              onClick={handleAddNewFolder}
              className={classes.addBtn}
              classes={{
                startIcon: classes.addIcon,
              }}
              size="small"
              label="Add new folder"
              startIcon={<PlusIcon />}
            />
            {newFolder.show ? (
              <Box>
                <InputLabel>New Folder Name</InputLabel>
                <Box display="flex" alignItems="center">
                  <Input
                    autoFocus
                    placeholder="Enter name for new folder"
                    className={classes.input}
                    value={newFolder.name}
                    onChange={handleChangeNewFolderName}
                  />
                  <IconButton onClick={handleRemoveNewFolder}>
                    <CloseIcon className={classes.closeIcon} />
                  </IconButton>
                </Box>
              </Box>
            ) : null}
            <Dropzone
              className={classes.dropzone}
              multiple
              onChange={handleSelectFiles}
            />
            <FilesList
              className={classes.filesList}
              files={selectedFiles}
              onRemove={handleRemoveFile}
            />
            <CheckboxControl
              label={'Overwrite file'}
              checked={overwrite}
              onChange={handleChangeOverwriteCheckbox}
            />
            <Box
              display="flex"
              flexWrap="wrap"
              marginTop="30px"
              marginBottom="30px"
              gap="10px"
            >
              {attributes.map((attribute) => {
                const disabled =
                  attribute.InternalName === 'Viewing_x0020_rights';

                return (
                  <Box key={attribute.DisplayName} flexBasis="calc(50% - 10px)">
                    <CheckboxGroup
                      name={attribute.InternalName}
                      attribute={attribute}
                      selected={
                        selectedAttributes[
                          attribute.InternalName as keyof SelectedAttributesModel
                        ]
                      }
                      onChange={handleChangeAttribute}
                      disabled={disabled}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <CancelButton onClick={() => onClose()}>Cancel</CancelButton>
              <ApplyButton
                className={classes.uploadBtn}
                disableRipple={uploadFlag}
                disabled={disabledDeployBtn}
                onClick={upload}
                endIcon={
                  uploadFlag ? (
                    <CircularProgress
                      size={20}
                      className={classes.uploadLoader}
                    />
                  ) : undefined
                }
              >
                Upload
              </ApplyButton>
            </Box>
          </>
        )}
      </div>
      <DialogError error={error} initError={initErrors} />
    </>
  );
};

export default UploadForm;
