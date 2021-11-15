import useUploadFormData from './useUploadFormData';
import { SelectedAttributesModel } from 'models';
import { FolderModel } from 'services';

import Dialog from 'components/Dialog';
import FolderPicker from 'components/FolderPicker';
import CheckboxControl from 'components/CheckboxControl';
import Box from '@mui/material/Box';
import { IconButton, ApplyButton, CancelButton } from 'components/Styled';
import Button from 'components/Button';
import Input from 'components/Input';
import Dropzone from 'components/Dropzone';
import FilesList from 'components/FilesList';
import CheckboxGroup from 'components/CheckboxGroup';
import ErrorView from 'components/ErrorView';
import { PlusIcon, CloseIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

interface UploadFormProps {
  rootFolder: FolderModel;
  fetchFolders(): Promise<any>;
  onClose(): void;
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
    selectedFiles,
    foldersOptions,
    handleChangeSelectedFolder,
    handleSelectFiles,
    handleRemoveFile,
    saveNewFolderName,
    handleAddNewFolder,
    handleChangeNewFolderName,
    handleRemoveNewFolder,
    handleChangeOverwriteCheckbox,
    upload,
    initErrors,
  } = useUploadFormData(rootFolder, fetchFolders, onClose);

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
              <span className={classes.label}>Parent Folder Name</span>
              <FolderPicker
                selected={selectedFolder}
                options={foldersOptions}
                onChange={handleChangeSelectedFolder}
                saveFolderName={saveNewFolderName}
              />
            </Box>
            <Button
              disabled={newFolder.show || selectedFolder?.sub}
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
                <span className={classes.label}>New Folder Name</span>
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
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ApplyButton
                className={classes.uploadBtn}
                disableRipple={uploadFlag}
                disabled={!selectedFiles.length || uploadFlag}
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
      <Dialog open={Boolean(error)} handleClose={initErrors}>
        {error?.messages ? <ErrorView messages={error.messages} /> : null}
      </Dialog>
    </>
  );
};

export default UploadForm;
