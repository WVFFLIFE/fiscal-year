import { memo, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useArticleEditorData from './useArticleEditorData';

import { EditorData } from 'models';

import Box from '@mui/material/Box';
import TextEditor from 'components/TextEditor';
import ActionButton from 'components/ActionButton';
import { SubTitle } from 'components/Styled';
import { EditIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface ArticleEditorProps {
  className?: string;
  title: string;
  activeId: string | null;
  prevId: string | null;
  id: string;
  data: EditorData;
  maxCharactersLength?: number;
  singleline?: boolean;
  disabled?: boolean;
  onSave(id: string, editorData: EditorData, cb?: () => void): Promise<unknown>;
  onSelectArticle(id: string | null): void;
}

const ArticleEditor: FC<ArticleEditorProps> = ({
  activeId,
  prevId,
  className,
  data,
  disabled,
  maxCharactersLength = 2000,
  id,
  singleline,
  title,
  onSave,
  onSelectArticle,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    activeEditMode,
    editorState,
    handleChangeEditorState,
    handleSaveCurrentArticle,
    handleSelectArticle,
    handleUnselectArticle,
  } = useArticleEditorData({
    activeId,
    prevId,
    id,
    editorData: data,
    onSave,
    onSelectArticle,
  });

  const isDisabledTextEditor = disabled || !!!activeEditMode;

  const currentContentLength = useMemo(() => {
    return activeEditMode
      ? editorState.getCurrentContent().getPlainText().length
      : 0;
  }, [editorState, activeEditMode]);

  const isLimitExceeded = currentContentLength > maxCharactersLength;

  return (
    <Box
      className={clsx(classes.section, {
        [classes.disabledSection]: disabled,
      })}
    >
      <SubTitle className={classes.titleOffset}>{t(title)}</SubTitle>
      <div className={clsx(classes.root, className)}>
        <div className={classes.editor}>
          <TextEditor
            classes={{
              controlPanel: classes.controlPanel,
            }}
            maxCharactersLength={maxCharactersLength}
            disabled={isDisabledTextEditor}
            editorState={editorState}
            singleline={singleline}
            onChangeEditorState={handleChangeEditorState}
          />
        </div>
        <div
          className={clsx(classes.actions, {
            [classes.active]: activeEditMode,
          })}
        >
          {disabled ? null : activeEditMode ? (
            <>
              <ActionButton
                onClick={handleUnselectArticle}
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
                onClick={handleSaveCurrentArticle}
                className={classes.btn}
                classes={{
                  startIcon: classes.startIcon,
                }}
                disabled={isLimitExceeded}
                palette="darkBlue"
                size="small"
                startIcon={<RoundCheckIcon />}
              >
                {t('#button.save')}
              </ActionButton>
            </>
          ) : (
            <ActionButton
              onClick={handleSelectArticle}
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
    </Box>
  );
};

export default memo(ArticleEditor);
