import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';
import useDialogState from 'hooks/useSuccessDialogState';

import {
  selectIsClosedField,
  selectPrevFiscalYear,
} from 'selectors/generalPageSelectors';

import Dropdown from 'components/Dropdown';
import FromTemplateView from 'components/FromTemplateView';
import CopyExistingView from './CopyExistingView';
import Dialog from 'components/Dialog';
import ActionButton from 'components/ActionButton';
import ConfirmationWindow from 'components/ConfirmationWindow';
import {
  CopyIcon,
  TemplateIcon,
  ArrowIcon,
  TriangleWarningIcon,
} from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const CopyFiscalYear = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { isClosed, prevFiscalYear } = useStateSelector((state) => ({
    prevFiscalYear: selectPrevFiscalYear(state),
    isClosed: selectIsClosedField(state),
  }));
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const templateDialogState = useDialogState();
  const sourceDialogState = useDialogState();
  const fiscalYearMissingDialogState = useDialogState();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickCopyExistingFYButton = () => {
    if (prevFiscalYear) {
      sourceDialogState.open();
    } else {
      fiscalYearMissingDialogState.open();
    }

    handleCloseMenu();
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
          onClick={handleClickCopyExistingFYButton}
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
      <ConfirmationWindow
        maxWidth="sm"
        open={fiscalYearMissingDialogState.isOpen}
        handleClose={fiscalYearMissingDialogState.close}
        title={t('#common.copyfiscalyear')}
        description={t('#error.fiscalyear.copy.previousfiscalyearnotfound')}
        Icon={<TriangleWarningIcon className={classes.warningIcon} />}
        ApplyBtnProps={{
          label: t('#button.ok'),
          onClick: fiscalYearMissingDialogState.close,
        }}
      />
    </>
  );
};

export default CopyFiscalYear;
