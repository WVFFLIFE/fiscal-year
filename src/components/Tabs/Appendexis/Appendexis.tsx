import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useAppendexisData from './useAppendexisData';
import useToggleSwitch from 'hooks/useToggleSwitch';

import Box from '@mui/material/Box';
import ArticleEditor from 'components/ArticleEditor';
import ActionButton from 'components/ActionButton';
import Dialog from 'components/Dialog';
import InfoIcon from 'components/Icons/InfoIcon';
import RunningNumberSettingsTable from './RunningNumberSettingsTable';

import { useStyles } from './style';

const Appendexis = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { columns, isClosed, runningNumberSettings, handleUpdateFiscalYear } =
    useAppendexisData();
  const [showDialog, toggleDialogVisibility] = useToggleSwitch();

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <ActionButton
          className={classes.btn}
          startIcon={<InfoIcon />}
          onClick={toggleDialogVisibility}
        >
          {t('#tab.appendexis.runningnumbersettings.btn')}
        </ActionButton>
      </Box>
      <Box>
        {columns.map((column, idx) => {
          return (
            <ArticleEditor
              key={idx}
              title={column.label}
              data={column.editorData}
              onSave={column.onSave}
              onUpdate={handleUpdateFiscalYear}
              disabled={isClosed}
            />
          );
        })}
      </Box>
      <Dialog
        maxWidth="md"
        title={t('#tab.appendexis.runningnumbersettings.dialog.title')}
        open={showDialog}
        handleClose={toggleDialogVisibility}
      >
        {runningNumberSettings && (
          <RunningNumberSettingsTable data={runningNumberSettings} />
        )}
      </Dialog>
    </Box>
  );
};

export default memo(Appendexis);
