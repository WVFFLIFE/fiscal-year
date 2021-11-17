import { useState, MouseEvent, ChangeEvent } from 'react';
import { FolderModel } from '../FolderPicker';
import { isChild } from '../utils';

import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import Input from 'components/Input';
import { IconButton } from 'components/Styled';
import {
  ArrowIcon,
  EditIcon,
  CloseIcon,
  RoundCheckIcon,
} from 'components/Icons';

import clsx from 'clsx';
import { useStyles, useEditableStyles } from './style';

interface EditableProps {
  folder: FolderModel;
  onChangeFolderName(folderId: string, newFolderName: string): Promise<void>;
  onRejectEditMode(e: MouseEvent<HTMLButtonElement>): void;
}

const FolderNameEditor: React.FC<EditableProps> = ({
  folder,
  onChangeFolderName,
  onRejectEditMode,
}) => {
  const classes = useEditableStyles();

  const [folderName, setFolderName] = useState(folder.Name);
  const [loading, setLoading] = useState(false);

  const stopPropagate = (e: MouseEvent<unknown>) => {
    e.stopPropagation();
  };

  const handleChangeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFolderName(value);
  };

  const handleAcceptFolderName = async (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagate(e);
    try {
      setLoading(true);
      await onChangeFolderName(folder.Id, folderName);
      onRejectEditMode(e);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        autoFocus
        disabled={loading}
        classes={{ root: classes.input }}
        value={folderName}
        onChange={handleChangeFolderName}
        onClick={stopPropagate}
        onMouseDown={stopPropagate}
      />
      {loading ? (
        <CircularProgress size={16} className={classes.loader} />
      ) : (
        <div className={classes.btnsWrapper}>
          <IconButton
            className={classes.closeBtn}
            onMouseDown={stopPropagate}
            onClick={onRejectEditMode}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
          <IconButton onClick={handleAcceptFolderName}>
            <RoundCheckIcon className={classes.icon} />
          </IconButton>
        </div>
      )}
    </>
  );
};

interface FolderItemProps {
  selectedFolder: FolderModel | null;
  depth: number;
  open?: boolean;
  folder: FolderModel;
  onChangeFolder(newFolder: FolderModel, folderDepth: number): void;
  onChangeFolderName(folderId: string, newFolderName: string): Promise<void>;
}

const FolderItem: React.FC<FolderItemProps> = ({
  depth,
  open: defaultOpen = false,
  folder,
  selectedFolder,
  onChangeFolder,
  onChangeFolderName,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(defaultOpen);

  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const stopPropagate = (e: MouseEvent<unknown>) => {
    e.stopPropagation();
  };

  const handleToggleCollapse = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagate(e);

    setOpen((prevState) => !prevState);
  };

  const handleClickMenuItem = (e: MouseEvent<HTMLLIElement>) => {
    stopPropagate(e);

    onChangeFolder(folder, depth);
  };

  const handleMouseOver = (e: MouseEvent<HTMLLIElement>) => {
    stopPropagate(e);
    setShowEditBtn(true);
  };

  const handleMouseOut = () => {
    setShowEditBtn(false);
  };

  const handleSetEditMode = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagate(e);
    setEditMode(true);
  };

  const handleRejectEditMode = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagate(e);
    setEditMode(false);
  };

  const root = depth === 0;
  const hasSubFolders = !!folder.Folders.length;
  const isSelected = !!(selectedFolder && selectedFolder.Id === folder.Id);

  return (
    <>
      <MenuItem
        className={classes.item}
        onClick={handleClickMenuItem}
        style={{ paddingLeft: 20 * (depth + 0.5) }}
        selected={isSelected}
        onMouseDown={stopPropagate}
        onMouseOver={root ? undefined : handleMouseOver}
        onMouseOut={root ? undefined : handleMouseOut}
      >
        <div className={clsx(classes.wrapper, classes.spaceBetween)}>
          <div className={clsx(classes.wrapper, classes.f1)}>
            {hasSubFolders ? (
              <IconButton
                className={classes.arrowBtn}
                onClick={handleToggleCollapse}
                onMouseDown={stopPropagate}
              >
                <ArrowIcon className={classes.arrowIcon} />
              </IconButton>
            ) : null}
            {editMode ? (
              <FolderNameEditor
                folder={folder}
                onChangeFolderName={onChangeFolderName}
                onRejectEditMode={handleRejectEditMode}
              />
            ) : (
              <span className={classes.name}>{folder.Name}</span>
            )}
          </div>
          {editMode ? null : !root ? (
            <IconButton
              onClick={handleSetEditMode}
              onMouseDown={stopPropagate}
              className={clsx(classes.editBtn, {
                [classes.editBtnVisible]: showEditBtn,
              })}
            >
              <EditIcon className={classes.itemIcon} />
            </IconButton>
          ) : null}
        </div>
      </MenuItem>
      {hasSubFolders ? (
        <Collapse
          className={classes.collapse}
          in={open}
          component="li"
          unmountOnExit
        >
          <ul className={classes.reset}>
            {folder.Folders.map((subFolder) => {
              const open = isChild(subFolder, selectedFolder);
              return (
                <FolderItem
                  key={subFolder.Id}
                  depth={depth + 1}
                  open={open}
                  folder={subFolder}
                  selectedFolder={selectedFolder}
                  onChangeFolder={onChangeFolder}
                  onChangeFolderName={onChangeFolderName}
                />
              );
            })}
          </ul>
        </Collapse>
      ) : null}
    </>
  );
};

export default FolderItem;
