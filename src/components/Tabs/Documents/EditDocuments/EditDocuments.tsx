import useEditDocumentsData from './useEditDocumentsData';
import { useTranslation } from 'react-i18next';
import { FolderModel, DocumentModel, SelectedAttributesModel } from 'models';

import { getAttributeTitle } from '../utils';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FolderPicker from 'components/FolderPicker';
import ActionButton from 'components/ActionButton';
import Input from 'components/Input';
import DialogError from 'components/DialogError';
import CheckboxGroup from 'components/CheckboxGroup';
import CheckboxControl from 'components/CheckboxControl';
import {
  InputLabel,
  CancelButton,
  ApplyButton,
  IconButton,
} from 'components/Styled';
import { PlusIcon, CloseIcon } from 'components/Icons';

import { useStyles } from './style';

interface EditDocumentsProps {
  rootFolder: FolderModel;
  activeFolder: FolderModel;
  selectedDocuments: DocumentModel[];
  fetchFolders: () => Promise<void>;
  onClose: (showSuccessDialog?: boolean) => void;
}

const EditDocuments: React.FC<EditDocumentsProps> = ({
  rootFolder,
  activeFolder,
  selectedDocuments,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    attributes,
    error,
    attributesLoading,
    handleAddNewFolder,
    handleChangeAttribute,
    handleChangeNewFolderName,
    handleChangeOverwriteCheckbox,
    handleChangeSelectedFolder,
    handleRemoveNewFolder,
    handleSaveNewFolderName,
    initError,
    newFolder,
    overwrite,
    saveFlag,
    selected,
    updateDocs,
  } = useEditDocumentsData(
    rootFolder,
    activeFolder,
    selectedDocuments,
    fetchFolders,
    onClose
  );

  const disabledSaveBtn = saveFlag || !selected.folder;
  const disabledAddNewFolderBtn = newFolder.show || selected.folderDepth >= 2;

  return (
    <div>
      <h3 className={classes.title}>{t('#tab.documents.edit.title')}</h3>
      {attributesLoading ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <>
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
          <ActionButton
            disabled={disabledAddNewFolderBtn}
            onClick={handleAddNewFolder}
            className={classes.addBtn}
            classes={{
              startIcon: classes.addIcon,
            }}
            size="small"
            startIcon={<PlusIcon />}
          >
            {t('#tab.documents.upload.addnewfolder')}
          </ActionButton>
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
                <Box key={attribute.DisplayName} flexBasis="calc(50% - 10px)">
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
              onClick={updateDocs}
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

export default EditDocuments;
