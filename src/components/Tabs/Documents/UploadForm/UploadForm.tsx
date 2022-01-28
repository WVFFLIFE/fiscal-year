import useUploadFormData from './useUploadFormData';
import { useTranslation } from 'react-i18next';
import { SelectedAttributesModel, FolderModel } from 'models';

import { getAttributeTitle } from '../utils';

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
  activeFolder: FolderModel;
  fetchFolders(): Promise<any>;
  onClose(showSuccessDialog?: boolean): void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  rootFolder,
  activeFolder,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
  } = useUploadFormData(rootFolder, activeFolder, fetchFolders, onClose);

  const disabledDeployBtn =
    !selectedFiles.length || uploadFlag || !selectedFolder;

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div>
        <h3 className={classes.title}>{t('#tab.documents.upload.title')}</h3>
        <p className={classes.description}>
          {t('#tab.documents.upload.description')}
        </p>
        {loading ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <>
            <Box marginBottom="10px">
              <InputLabel>
                {t('#tab.documents.upload.parentfoldername')}
              </InputLabel>
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
              label={t('#tab.documents.upload.addnewfolder')}
              startIcon={<PlusIcon />}
            />
            {newFolder.show ? (
              <Box>
                <InputLabel>
                  {t('#tab.documents.upload.newfoldername')}
                </InputLabel>
                <Box display="flex" alignItems="center">
                  <Input
                    autoFocus
                    placeholder={t(
                      '#tab.documents.upload.enternameforanewfolder'
                    )}
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
              label={t('#tab.documents.upload.overwritefile')}
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
                const title = getAttributeTitle(attribute.InternalName);

                return (
                  <Box key={attribute.DisplayName} flexBasis="calc(50% - 20px)">
                    <CheckboxGroup
                      name={attribute.InternalName}
                      title={t(title) as string}
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
              <CancelButton onClick={handleClose}>
                {t('#button.cancel')}
              </CancelButton>
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
                {t('#button.upload')}
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
