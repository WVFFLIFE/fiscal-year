import { useState, MouseEvent } from 'react';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { useTranslation } from 'react-i18next';

import { ButtonProps } from '@mui/material/Button';
import ActionButton from 'components/ActionButton';
import { PlusIcon, ArrowIcon, TemplateIcon, CopyIcon } from 'components/Icons';
import Dropdown from 'components/Dropdown';
import Dialog from 'components/Dialog';
import CopyDialogBody from './CopyDialogBody';
import FromTemplateView from 'components/FromTemplateView';

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
      <Dropdown anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
        <Dropdown.Item
          className={classes.menuItem}
          onClick={handleClickCreateFromTemplateFiscalYearItem}
        >
          <TemplateIcon className={classes.menuItemIcon} />
          {t('#common.fromtemplate')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleClickCopyExistingFiscalYearItem}
          className={classes.menuItem}
        >
          <CopyIcon className={classes.menuItemIcon} />
          {t('#common.copytheexistingfiscalyear')}
        </Dropdown.Item>
      </Dropdown>
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
        <FromTemplateView
          type="create"
          onClose={toggleCreateFromTemplateDialogVisibility}
        />
      </Dialog>
    </>
  );
};

export default AddFiscalYearButton;
