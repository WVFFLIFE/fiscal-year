import { memo, FC, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';
import useCommentData from './useCommentData';
import { Comment as CommentModel } from 'services/s';
import { EditorState } from 'draft-js';

import { dateTimeFormat } from 'utils/dates';
import { selectCommentsSettings } from 'selectors/settingsSelectors';

import AddNewComment from '../AddNewComment';
import TextEditor from 'components/TextEditor';
import Avatar from '../Avatar';
import Button from '@mui/material/Button';
import ActionButton from 'components/ActionButton';
import { IconButton } from 'components/Styled';
import { EditIcon, DeleteIcon, RoundQuestionIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationWindow from 'components/ConfirmationWindow';
import CheckboxControl from 'components/CheckboxControl';

import clsx from 'clsx';
import { useStyles } from './style';

function hasText(editorState: EditorState) {
  return editorState.getCurrentContent().hasText();
}

type AsyncRes = Promise<boolean | undefined>;

interface CommentProps {
  className?: string;
  canReply?: boolean;
  comment: CommentModel;
  onUpdate(req: {
    id: string;
    text: string | null;
    formatted: string | null;
  }): AsyncRes;
  onDelete(id: string): AsyncRes;
  onReply?(req: {
    parentId?: string | null;
    text: string | null;
    formatted: string | null;
  }): AsyncRes;
  onMarkAsRead?(commentId: string): AsyncRes;
}

const Comment: FC<CommentProps> = ({
  className,
  comment,
  canReply = true,
  onUpdate,
  onDelete,
  onMarkAsRead,
  onReply,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const addNewCommentRef = useRef<HTMLDivElement>(null);
  const commentsSettings = useStateSelector(selectCommentsSettings);

  const {
    isReadFlag,
    marking,
    deleting,
    replyMode,
    handleDeleteComment,
    showDeleteConfirmation,
    toggleShowDeleteConfirmation,
    toggleReplyMode,
    saving,
    editMode,
    editorState,
    toggleEditMode,
    setEditorState,
    handleUpdateComment,
    handleCloseEditMode,
    handleChangeIsReadFlag,
  } = useCommentData(comment, onUpdate, onDelete, onMarkAsRead);

  useEffect(() => {
    if (replyMode) {
      if (addNewCommentRef.current) {
        addNewCommentRef.current.scrollIntoView();
      }
    }
  }, [replyMode]);

  const isDisabledSaveBtn = saving || !hasText(editorState);

  return (
    <div>
      <div
        className={clsx(classes.comment, className, {
          [classes.commentEdit]: editMode,
          [classes.commentNotRead]: !comment.IsRead,
        })}
      >
        <Avatar src={comment.OwnerImageUrl} />
        <div className={classes.content}>
          {editMode ? null : (
            <div className={classes.contentTop}>
              <span className={classes.commentOwner}>{comment.OwnerName}</span>
              <div className={classes.actions}>
                {comment.CanEdit && (
                  <IconButton className={classes.btn} onClick={toggleEditMode}>
                    <EditIcon className={classes.icon} />
                  </IconButton>
                )}
                {comment.CanDelete && (
                  <IconButton
                    className={clsx(classes.btn, classes.btnOffset)}
                    onClick={toggleShowDeleteConfirmation}
                  >
                    <DeleteIcon className={classes.icon} />
                  </IconButton>
                )}
              </div>
            </div>
          )}
          <TextEditor
            disabled={!editMode}
            classes={{
              disabled: classes.disabledEditor,
            }}
            editorState={editorState}
            onChangeEditorState={setEditorState}
            maxCharactersLength={commentsSettings.commentMaxLength}
          />
          {editMode ? (
            <div className={classes.editBtnsWrapper}>
              <ActionButton onClick={handleCloseEditMode}>
                {t('#button.cancel')}
              </ActionButton>
              <ActionButton
                palette="darkBlue"
                className={classes.btnOffset}
                onClick={handleUpdateComment}
                disabled={isDisabledSaveBtn}
                startIcon={
                  saving ? (
                    <CircularProgress size={17} className={classes.loader} />
                  ) : undefined
                }
              >
                {t('#button.save')}
              </ActionButton>
            </div>
          ) : (
            <div className={classes.footer}>
              <div className={classes.flex}>
                <span className={classes.edited}>{`${t('#comments.edited')} ${
                  comment.ModifiedOn
                    ? dateTimeFormat(new Date(comment.ModifiedOn))
                    : ''
                }`}</span>
                {canReply && (
                  <Button
                    className={classes.replyBtn}
                    onClick={toggleReplyMode}
                  >
                    {t('#comments.reply')}
                  </Button>
                )}
              </div>
              {!comment.IsRead && (
                <div className={classes.flex}>
                  <CheckboxControl
                    label={t('#comments.markasread')}
                    checked={isReadFlag}
                    classes={{ label: classes.checkboxLabel }}
                    onChange={handleChangeIsReadFlag}
                    disabled={marking}
                  />
                  {marking && (
                    <CircularProgress
                      size={15}
                      className={classes.markingLoader}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <ConfirmationWindow
          maxWidth="sm"
          open={showDeleteConfirmation}
          handleClose={toggleShowDeleteConfirmation}
          title={t('#comments.delete.title')}
          description={t('#comments.delete.description')}
          Icon={<RoundQuestionIcon className={classes.warningIcon} />}
          ApplyBtnProps={{
            label: t('#button.delete'),
            loading: deleting,
            onClick: handleDeleteComment,
            disabled: deleting,
          }}
          CancelBtnProps={{
            label: t('#button.cancel'),
            onClick: toggleShowDeleteConfirmation,
          }}
        />
      </div>
      {onReply && replyMode && (
        <AddNewComment
          ref={addNewCommentRef}
          withCancelBtn
          className={classes.addNewCommentOffset}
          parentId={comment.Id}
          onAddComment={onReply}
          onCancel={toggleReplyMode}
        />
      )}
      <div
        className={clsx(classes.relatedCommentsWrapper, {
          [classes.relatedCommentsWrapperOffset]:
            !!comment.RelatedComments.length,
        })}
      >
        {comment.RelatedComments.map((relatedComment) => (
          <Comment
            key={relatedComment.Id}
            className={className}
            comment={relatedComment}
            onUpdate={onUpdate}
            onDelete={onDelete}
            canReply={false}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Comment);
