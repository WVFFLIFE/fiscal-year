import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import useArticleEditorData from './useArticleEditorData';

import { EditorData } from 'models';
import { BaseResponseModel } from 'services';

import Box from '@mui/material/Box';
import TextEditor from 'components/TextEditor';
import ActionButton from 'components/ActionButton';
import DialogError from 'components/DialogError';
import { SubTitle } from 'components/Styled';
import { EditIcon, RoundCheckIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import { useStyles } from './style';

interface ArticleEditorProps {
  className?: string;
  title?: string;
  data: EditorData;
  disabled?: boolean;
  onSave: (
    text: string | null,
    formatted: string | null,
    html: string | null
  ) => Promise<BaseResponseModel | undefined>;
  onUpdate: () => Promise<unknown>;
}

const ArticleEditor: FC<ArticleEditorProps> = ({
  className,
  title,
  data,
  disabled,
  onSave,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    requestState,
    editModeOn,
    editorState,
    handleChangeEditorState,
    handleSave,
    handleToggleEditMode,
    handleCancelEditMode,
    handleInitError,
  } = useArticleEditorData(data, onSave, onUpdate);

  return (
    <Box className={classes.section}>
      {title && <SubTitle className={classes.titleOffset}>{t(title)}</SubTitle>}
      {editorState && (
        <div
          className={clsx(classes.root, className, {
            [classes.rootDisabled]: disabled,
          })}
        >
          <div className={classes.editor}>
            <TextEditor
              classes={{
                controlPanel: classes.controlPanel,
              }}
              disabled={disabled || !!!editModeOn}
              editorState={editorState}
              onChangeEditorState={handleChangeEditorState}
            />
          </div>
          <div
            className={clsx(classes.actions, {
              [classes.active]: editModeOn,
            })}
          >
            {disabled ? null : editModeOn ? (
              <>
                <ActionButton
                  onClick={handleCancelEditMode}
                  className={clsx(classes.btn, classes.cancelBtnOffset)}
                  classes={{
                    startIcon: classes.startIcon,
                  }}
                  size="small"
                  palette="white"
                >
                  {t('#button.cancel')}
                </ActionButton>
                <ActionButton
                  onClick={handleSave}
                  className={classes.btn}
                  classes={{
                    startIcon: classes.startIcon,
                  }}
                  palette="darkBlue"
                  size="small"
                  disabled={requestState.loading}
                  startIcon={<RoundCheckIcon />}
                  endIcon={
                    requestState.loading ? (
                      <CircularProgress size={15} className={classes.loader} />
                    ) : null
                  }
                >
                  {t('#button.save')}
                </ActionButton>
              </>
            ) : (
              <ActionButton
                onClick={handleToggleEditMode}
                className={classes.btn}
                classes={{
                  startIcon: classes.startIcon,
                }}
                palette="white"
                size="small"
                startIcon={<EditIcon />}
              >
                {t('#button.edit')}
              </ActionButton>
            )}
          </div>
        </div>
      )}
      <DialogError error={requestState.error} initError={handleInitError} />
    </Box>
  );
};

export default memo(ArticleEditor);
