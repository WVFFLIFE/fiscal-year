import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useCommentsData from './useCommentsData';

import SuspenceFacade from 'components/SuspenceFacade';
import Comment from './Comment';
import AddNewComment from './AddNewComment';
import Backdrop from 'components/Backdrop';
import { Scroll } from 'components/Styled';

import { useStyles } from './style';

const Comments = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, []);

  const {
    requestState,
    handleInitError,
    addComment,
    updateComment,
    deleteComment,
    markAsRead,
  } = useCommentsData();

  return (
    <SuspenceFacade
      loading={requestState.loading}
      error={requestState.error}
      onInitError={handleInitError}
    >
      <div className={classes.root}>
        {requestState.comments.length ? null : (
          <div className={classes.billet}>{t('#comments.empty')}</div>
        )}
        <div className={classes.container}>
          <Scroll className={classes.commentsWrapper} ref={parentRef}>
            {requestState.comments.map((comment) => (
              <Comment
                key={comment.Id}
                className={classes.comment}
                comment={comment}
                onUpdate={updateComment}
                onReply={addComment}
                onDelete={deleteComment}
                onMarkAsRead={markAsRead}
              />
            ))}
          </Scroll>
          <div className={classes.divider}></div>
          <AddNewComment onAddComment={addComment} />
        </div>
      </div>
      <Backdrop loading={requestState.update} />
    </SuspenceFacade>
  );
};

export default Comments;
