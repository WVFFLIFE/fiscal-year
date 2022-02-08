import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import useCopyFiscalYearData from './useCopyFiscalYearData';
import useStateSelector from 'hooks/useStateSelector';
import useDialogState from 'hooks/useSuccessDialogState';

import { selectIsClosedField } from 'selectors/generalPageSelectors';

import Dropdown from 'components/Dropdown';
import FromTemplateView from 'components/FromTemplateView';
import CopyExistingView from './CopyExistingView';
import Dialog from 'components/Dialog';
import ActionButton from 'components/ActionButton';
import DialogError from 'components/DialogError';
import { CopyIcon, TemplateIcon, ArrowIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const CopyFiscalYear = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { isClosed } = useStateSelector((state) => ({
    isClosed: selectIsClosedField(state),
  }));
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const templateDialogState = useDialogState();
  const sourceDialogState = useDialogState();
  const { requestState, handleInitError } = useCopyFiscalYearData();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ActionButton
        size="large"
        startIcon={<CopyIcon />}
        endIcon={
          <ArrowIcon
            className={clsx(classes.arrowIcon, {
              [classes.rotatedArrowIcon]: !!anchorEl,
            })}
          />
        }
        disabled={isClosed}
        onClick={handleOpenMenu}
      >
        {t('#button.copyfy')}
      </ActionButton>
      <Dropdown anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
        <Dropdown.Item
          className={classes.menuItem}
          onClick={() => {
            templateDialogState.open();
            handleCloseMenu();
          }}
        >
          <TemplateIcon className={classes.menuItemIcon} />
          {t('#common.fromtemplate')}
        </Dropdown.Item>
        <Dropdown.Item
          className={classes.menuItem}
          onClick={() => {
            sourceDialogState.open();
            handleCloseMenu();
          }}
        >
          <CopyIcon className={classes.menuItemIcon} />
          {t('#common.copytheexistingfiscalyear')}
        </Dropdown.Item>
      </Dropdown>
      <Dialog
        maxWidth="xs"
        open={templateDialogState.isOpen}
        handleClose={templateDialogState.close}
      >
        <FromTemplateView type="copy" onClose={templateDialogState.close} />
      </Dialog>
      <Dialog
        maxWidth="xs"
        open={sourceDialogState.isOpen}
        handleClose={sourceDialogState.close}
      >
        <CopyExistingView onClose={sourceDialogState.close} />
      </Dialog>
      <DialogError error={requestState.error} initError={handleInitError} />
    </>
  );
};

export default CopyFiscalYear;
