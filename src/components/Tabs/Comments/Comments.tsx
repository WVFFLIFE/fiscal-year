import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useCommentsData from './useCommentsData';

import SuspenceFacade from 'components/SuspenceFacade';
import Comment from './Comment';
import AddNewComment from './AddNewComment';
import Backdrop from 'components/Backdrop';
import { Scroll } from 'components/Styled';

import { useStyles } from './style';

interface Req {
  parentId?: string | null;
  text: string;
  formatted: string;
}

const Comments = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const wasScrolled = useRef(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    requestState,
    handleInitError,
    addComment,
    updateComment,
    deleteComment,
    markAsRead,
  } = useCommentsData();

  const scrollToBottom = () => {
    if (parentRef.current) {
      parentRef.current.scroll({ top: parentRef.current.scrollHeight });
    }
  };

  const handleAddComment = async (req: Req) => {
    let res = await addComment(req);
    scrollToBottom();
    return res;
  };

  useEffect(() => {
    if (requestState.comments.length && !wasScrolled.current) {
      wasScrolled.current = true;
      scrollToBottom();
    }
  }, [requestState.comments]);

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
                onReply={handleAddComment}
                onDelete={deleteComment}
                onMarkAsRead={markAsRead}
              />
            ))}
          </Scroll>
          <div className={classes.divider}></div>
          <AddNewComment onAddComment={handleAddComment} />
        </div>
      </div>
      <Backdrop loading={requestState.update} />
    </SuspenceFacade>
  );
};

export default Comments;
