import { useState, MouseEvent } from 'react';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { useTranslation } from 'react-i18next';

import { ButtonProps } from '@mui/material/Button';
import ActionButton from 'components/ActionButton';
import { PlusIcon, ArrowIcon, TemplateIcon, CopyIcon } from 'components/Icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Dialog from 'components/Dialog';
import CopyDialogBody from './CopyDialogBody';
import CreateFromTemplateDialogBody from './CreateFromTemplateDialogBody';

import clsx from 'clsx';
import { useStyles } from './style';

const AddFiscalYearButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openCopyDialog, toggleCopyDialogVisibility] = useToggleSwitch();
  const [
    openCreatFromTemplateDialog,
    toggleCreateFromTemplateDialogVisibility,
  ] = useToggleSwitch();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickCopyExistingFiscalYearItem = () => {
    handleCloseMenu();
    toggleCopyDialogVisibility();
  };

  const handleClickCreateFromTemplateFiscalYearItem = () => {
    handleCloseMenu();
    toggleCreateFromTemplateDialogVisibility();
  };

  return (
    <>
      <ActionButton
        {...props}
        size="large"
        palette="darkBlue"
        onClick={handleOpenMenu}
        className={props.className}
        startIcon={<PlusIcon />}
        endIcon={
          <ArrowIcon
            className={clsx(classes.arrowIcon, {
              [classes.rotatedArrowIcon]: !!anchorEl,
            })}
          />
        }
      >
        {t('#button.addfy')}
      </ActionButton>
      <Menu
        open={!!anchorEl}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -4,
          horizontal: 'right',
        }}
        PaperProps={{
          className: classes.list,
        }}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={handleClickCreateFromTemplateFiscalYearItem}
        >
          <TemplateIcon className={classes.menuItemIcon} />
          From template
        </MenuItem>
        <MenuItem
          onClick={handleClickCopyExistingFiscalYearItem}
          className={classes.menuItem}
        >
          <CopyIcon className={classes.menuItemIcon} />
          Copy existing fiscal year
        </MenuItem>
      </Menu>
      <Dialog
        maxWidth="xs"
        open={openCopyDialog}
        handleClose={toggleCopyDialogVisibility}
      >
        <CopyDialogBody onClose={toggleCopyDialogVisibility} />
      </Dialog>
      <Dialog
        maxWidth="xs"
        open={openCreatFromTemplateDialog}
        handleClose={toggleCreateFromTemplateDialogVisibility}
      >
        <CreateFromTemplateDialogBody
          onClose={toggleCreateFromTemplateDialogVisibility}
        />
      </Dialog>
    </>
  );
};

export default AddFiscalYearButton;
