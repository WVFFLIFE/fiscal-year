import { useState, MouseEvent, ChangeEvent } from 'react';

import { SelectedFolder, FolderPickerItemModel } from '../FolderPicker';

import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Input from 'components/Input';
import {
  ArrowIcon,
  EditIcon,
  CloseIcon,
  RoundCheckIcon,
} from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface FolderItemProps {
  edit: boolean;
  onChange(newFolder: SelectedFolder): void;
  folder: FolderPickerItemModel;
  selected: SelectedFolder | null;
  saveFolderName(id: string, name: string): Promise<any>;
  sub?: boolean;
}

const FolderItem: React.FC<FolderItemProps> = ({
  edit,
  onChange,
  folder,
  selected,
  sub = false,
  saveFolderName,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  const stopPropagate = (e: MouseEvent<unknown>) => {
    e.stopPropagation();
  };

  const handleToggleCollapse = (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagate(e);

    setOpen((prevState) => !prevState);
  };

  const handleClickMenuItem = (e: MouseEvent<HTMLLIElement>) => {
    stopPropagate(e);

    onChange({ id: folder.id, name: folder.name, sub });
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

  const handleChangeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFolderName(value);
  };

  const acceptFolderNameChanges = async (e: MouseEvent<HTMLButtonElement>) => {
    stopPropagate(e);
    setLoading(true);

    await saveFolderName(folder.id, folderName);

    setLoading(false);
    setEditMode(false);
  };

  const hasSubFolders = !!folder.folders.length;

  return (
    <>
      <MenuItem
        className={clsx(classes.item, {
          [classes.sub]: sub,
        })}
        disableRipple={loading}
        onClick={loading ? undefined : handleClickMenuItem}
        onMouseDown={stopPropagate}
        onMouseOver={edit ? handleMouseOver : undefined}
        onMouseOut={edit ? handleMouseOut : undefined}
      >
        <div className={clsx(classes.wrapper, classes.spaceBetween)}>
          <div className={clsx(classes.wrapper, classes.f1)}>
            {hasSubFolders ? (
              <Button
                className={clsx(classes.btn, classes.arrowBtn)}
                onClick={loading ? undefined : handleToggleCollapse}
                onMouseDown={stopPropagate}
              >
                <ArrowIcon className={classes.arrowIcon} />
              </Button>
            ) : null}
            {editMode ? (
              <Input
                autoFocus
                disabled={loading}
                classes={{ root: classes.input }}
                value={folderName}
                onChange={handleChangeFolderName}
                onClick={stopPropagate}
                onMouseDown={stopPropagate}
              />
            ) : (
              <span className={classes.name}>{folder.name}</span>
            )}
          </div>
          {editMode ? (
            loading ? (
              <CircularProgress size={16} className={classes.loader} />
            ) : (
              <div>
                <Button
                  className={clsx(classes.btn, classes.closeBtn)}
                  onMouseDown={stopPropagate}
                  onClick={handleRejectEditMode}
                >
                  <CloseIcon className={classes.itemIcon} />
                </Button>
                <Button
                  className={classes.btn}
                  onClick={acceptFolderNameChanges}
                >
                  <RoundCheckIcon className={classes.itemIcon} />
                </Button>
              </div>
            )
          ) : (
            <Button
              onClick={handleSetEditMode}
              onMouseDown={stopPropagate}
              className={clsx(classes.btn, classes.editBtn, {
                [classes.editBtnVisible]: showEditBtn,
              })}
            >
              <EditIcon className={classes.itemIcon} />
            </Button>
          )}
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
            {folder.folders.map((subFolder) => {
              return (
                <FolderItem
                  sub
                  edit={edit}
                  key={subFolder.id}
                  folder={subFolder}
                  selected={selected}
                  saveFolderName={saveFolderName}
                  onChange={onChange}
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
