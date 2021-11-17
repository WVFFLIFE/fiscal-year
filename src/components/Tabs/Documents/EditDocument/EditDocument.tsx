import useEditDocumentData from './useEditDocumentData';
import { SelectedAttributesModel, FolderModel, DocumentModel } from 'models';

import Box from '@mui/material/Box';
import FolderPicker from 'components/FolderPicker';
import Input from 'components/Input';
import Button from 'components/Button';
import CheckboxGroup from 'components/CheckboxGroup';
import CircularProgress from '@mui/material/CircularProgress';
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
  onClose(): void;
}

const EditDocument: React.FC<EditDocumentModel> = ({
  rootFolder,
  activeFolder,
  selectedDocument,
  fetchFolders,
  onClose,
}) => {
  const classes = useStyles();
  const {
    attributes,
    attributesLoading,
    documentName,
    handleChangeDocumentName,
    newFolder,
    selected,
    save,
    saveFlag,
    handleAddNewFolder,
    handleRemoveNewFolder,
    handleChangeAttribute,
    handleChangeNewFolderName,
    handleChangeSelectedFolder,
    handleSaveNewFolderName,
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
      <h3 className={classes.title}>Edit document</h3>
      {attributesLoading ? (
        <CircularProgress className={classes.loader} />
      ) : (
        <>
          <Box marginBottom="30px">
            <InputLabel>Document Name</InputLabel>
            <Input value={documentName} onChange={handleChangeDocumentName} />
          </Box>
          <Box marginBottom="10px">
            <InputLabel>Parent Folder Name</InputLabel>
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
            <CancelButton onClick={() => onClose()}>Cancel</CancelButton>
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
              Save
            </ApplyButton>
          </Box>
        </>
      )}
    </div>
  );
};

export default EditDocument;
