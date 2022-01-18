import { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import useEditor, { convertStateToData } from 'hooks/useEditor';
import useStateSelector from 'hooks/useStateSelector';
import { EditorState } from 'draft-js';

import { selectCommentsSettings } from 'selectors/settingsSelectors';

import CommentSection from '../CommentSection';
import ActionButton from 'components/ActionButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

type WithCancelBtn =
  | {
      withCancelBtn: true;
      onCancel(): void;
    }
  | {
      withCancelBtn?: undefined;
      onCancel?: undefined;
    };

type AddNewCommentProps = {
  className?: string;
  parentId?: string | null;
  onAddComment(req: {
    parentId: string | null;
    text: string;
    formatted: string;
  }): Promise<boolean | undefined>;
} & WithCancelBtn;

function hasText(editorState: EditorState) {
  return editorState.getCurrentContent().hasText();
}

const AddNewComment = forwardRef<HTMLDivElement, AddNewCommentProps>(
  (
    {
      className,
      parentId = null,
      withCancelBtn = false,
      onAddComment,
      onCancel,
    },
    ref
  ) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const commentsSettings = useStateSelector(selectCommentsSettings);

    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useEditor();

    const resetEditor = () => {
      setEditorState(EditorState.createEmpty());
    };

    const handleAddComment = async () => {
      setLoading(true);

      const editorData = convertStateToData(editorState);

      if (!editorData.text || !editorData.formatted) return;

      const success = await onAddComment({
        parentId,
        text: editorData.text,
        formatted: editorData.formatted,
      });

      if (success) {
        resetEditor();

        onCancel && onCancel();
      }

      setLoading(false);
    };

    const isCharactersLimitExceeded =
      editorState.getCurrentContent().getPlainText().length >
      commentsSettings.commentMaxLength;
    const isDisabledAddBtn =
      loading || !hasText(editorState) || isCharactersLimitExceeded;

    return (
      <div className={className} ref={ref}>
        <CommentSection
          editorState={editorState}
          onChangeEditorState={setEditorState}
          placeholder={t('#comment.typeyourcomment')}
        />
        <div className={classes.btnsRow}>
          {withCancelBtn && onCancel && (
            <ActionButton
              className={classes.cancelBtnOffset}
              onClick={onCancel}
            >
              {t('#button.cancel')}
            </ActionButton>
          )}
          <ActionButton
            disabled={isDisabledAddBtn}
            palette="darkBlue"
            startIcon={
              loading ? (
                <CircularProgress size={17} className={classes.loader} />
              ) : undefined
            }
            onClick={handleAddComment}
          >
            {t('#comments.addnewcomment')}
          </ActionButton>
        </div>
      </div>
    );
  }
);

export default AddNewComment;
