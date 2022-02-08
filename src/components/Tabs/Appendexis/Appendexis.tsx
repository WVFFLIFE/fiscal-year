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
import DialogError from 'components/DialogError';
import Backdrop from 'components/Backdrop';

import { useStyles } from './style';

const Appendexis = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    articleId,
    columns,
    requestState,
    isClosed,
    runningNumberSettings,
    handleSaveArticle,
    handleSelectArticle,
    handleInitError,
  } = useAppendexisData();
  const [showDialog, toggleDialogVisibility] = useToggleSwitch();

  return (
    <Box sx={{ position: 'relative' }}>
      <ActionButton
        className={classes.btn}
        startIcon={<InfoIcon />}
        onClick={toggleDialogVisibility}
      >
        {t('#tab.appendexis.runningnumbersettings.btn')}
      </ActionButton>
      <Box>
        {columns.map((column) => {
          return (
            <ArticleEditor
              key={column.id}
              activeId={articleId.current}
              prevId={articleId.prev}
              data={column.editorData}
              disabled={isClosed}
              id={column.id}
              maxCharactersLength={column.maxLength}
              title={column.label}
              onSave={handleSaveArticle}
              onSelectArticle={handleSelectArticle}
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
      <DialogError error={requestState.error} initError={handleInitError} />
      <Backdrop loading={requestState.loading} />
    </Box>
  );
};

export default memo(Appendexis);
