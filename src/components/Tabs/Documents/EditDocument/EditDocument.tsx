import useEditDocumentData from './useEditDocumentData';
import { useTranslation } from 'react-i18next';
import { SelectedAttributesModel, FolderModel, DocumentModel } from 'models';

import { getAttributeTitle } from '../utils';

import Box from '@mui/material/Box';
import FolderPicker from 'components/FolderPicker';
import Input from 'components/Input';
import Button from 'components/Button';
import CheckboxGroup from 'components/CheckboxGroup';
import CheckboxControl from 'components/CheckboxControl';
import CircularProgress from '@mui/material/CircularProgress';
import DialogError from 'components/DialogError';
import {
  InputLabel,
  IconButton,
  ApplyButton,
  CancelButton,
} from 'components/Styled';
import { PlusIcon, CloseIcon } from 'components/Icons';

import { useStyles } from './style';

interface EditDocumentModel {
  rootFolder: FolderModel;
  activeFolder: FolderModel;
  selectedDocument: DocumentModel;
  fetchFolders(): Promise<void>;
  onClose(showSuccessDialog?: boolean): void;
}

const EditDocument: React.FC<EditDocumentModel> = ({
  rootFolder,
  activeFolder,
  selectedDocument,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    error,
    attributes,
    attributesLoading,
    documentName,
    handleChangeDocumentName,
    newFolder,
    selected,
    save,
    saveFlag,
    overwrite,
    initError,
    handleAddNewFolder,
    handleRemoveNewFolder,
    handleChangeAttribute,
    handleChangeNewFolderName,
    handleChangeSelectedFolder,
    handleSaveNewFolderName,
    handleChangeOverwriteCheckbox,
  } = useEditDocumentData(
    rootFolder,
    activeFolder,
    selectedDocument,
    fetchFolders,
    onClose
  );

  const disabledSaveBtn = saveFlag || !selected.folder || !documentName;

  return (
    <div>
      <h3 className={classes.title}>{t('#tab.documents.edit.title')}</h3>
      {attributesLoading ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <>
          <Box marginBottom="30px">
            <InputLabel>{t('#tab.documents.edit.documentname')}</InputLabel>
            <Input value={documentName} onChange={handleChangeDocumentName} />
          </Box>
          <Box marginBottom="10px">
            <InputLabel>
              {t('#tab.documents.upload.parentfoldername')}
            </InputLabel>
            <FolderPicker
              rootFolder={rootFolder}
              selectedFolder={selected.folder}
              onChangeFolder={handleChangeSelectedFolder}
              onChangeFolderName={handleSaveNewFolderName}
            />
          </Box>
          <Button
            disabled={!!(newFolder.show || selected.folderDepth >= 2)}
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
            <Box marginBottom="30px">
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
                    attribute={attribute}
                    title={t(title)}
                    selected={
                      selected.attributes[
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
            <CancelButton onClick={() => onClose()}>
              {t('#button.cancel')}
            </CancelButton>
            <ApplyButton
              className={classes.uploadBtn}
              disableRipple={saveFlag}
              disabled={disabledSaveBtn}
              onClick={save}
              endIcon={
                saveFlag ? (
                  <CircularProgress
                    size={20}
                    className={classes.uploadLoader}
                  />
                ) : undefined
              }
            >
              {t('#button.save')}
            </ApplyButton>
          </Box>
          <DialogError error={error} initError={initError} />
        </>
      )}
    </div>
  );
};

export default EditDocument;
