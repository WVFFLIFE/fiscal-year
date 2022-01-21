import { useState, useEffect, useRef } from 'react';
import useAppDispatch from 'hooks/useAppDispatch';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';

import {
  setUnreadComments,
  fetchUnreadCommentsSize,
} from 'features/commentsSlice';

import { ErrorModel } from 'models';
import { Services, Comment } from 'services/s';

const CommentsService = new Services.Comments();

function countUnreadComments(comments: Comment[]) {
  return comments.reduce((acc, next) => {
    return next.IsRead ? acc : acc++;
  }, 0);
}

interface RequestStateModel {
  comments: Comment[];
  loading: boolean;
  update: boolean;
  error: ErrorModel | null;
}

const useCommentsData = () => {
  const firstMount = useRef(true);
  const fiscalYear = useSelectFiscalYear();
  const dispatch = useAppDispatch();

  const [requestState, setRequestState] = useState<RequestStateModel>({
    comments: [],
    loading: false,
    update: false,
    error: null,
  });

  const fetchCommentsList = async (
    fiscalYearId: string,
    field: 'loading' | 'update' = 'loading'
  ) => {
    try {
      setRequestState((prevState) => ({
        ...prevState,
        [field]: true,
      }));

      const res = await CommentsService.get(fiscalYearId);

      if (res.IsSuccess) {
        dispatch(setUnreadComments(countUnreadComments(res.Comments)));
        setRequestState((prevState) => ({
          ...prevState,
          comments: res.Comments,
          [field]: false,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        [field]: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const addComment = async (req: {
    parentId?: string | null;
    text: string;
    formatted: string;
  }) => {
    if (!fiscalYear?.id) return;
    try {
      const res = await CommentsService.create(fiscalYear.id, {
        ParentCommentId: req.parentId || null,
        Description: req.text,
        DescriptionFormatted: req.formatted,
      });

      if (res.IsSuccess) {
        dispatch(fetchUnreadCommentsSize(fiscalYear.id));
        await fetchCommentsList(fiscalYear.id, 'update');
        return true;
      }

      throw new Error(res.Message);
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  const updateComment = async (req: {
    id: string;
    text: string;
    formatted: string;
  }) => {
    if (!fiscalYear?.id) return;
    try {
      const res = await CommentsService.update(fiscalYear.id, {
        Id: req.id,
        Description: req.text,
        DescriptionFormatted: req.formatted,
      });

      if (res.IsSuccess) {
        fetchCommentsList(fiscalYear.id, 'update');
        return true;
      }

      throw new Error(res.Message);
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  const deleteComment = async (id: string) => {
    if (!fiscalYear?.id) return;
    try {
      const res = await CommentsService.delete(fiscalYear.id, id);

      if (res.IsSuccess) {
        fetchCommentsList(fiscalYear.id, 'update');
        dispatch(fetchUnreadCommentsSize(fiscalYear.id));
        return true;
      }

      throw new Error(res.Message);
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  const markAsRead = async (id: string) => {
    if (!fiscalYear) return;
    try {
      const res = await CommentsService.markAsRead(id);

      if (res.IsSuccess) {
        fetchCommentsList(fiscalYear.id, 'update');
        dispatch(fetchUnreadCommentsSize(fiscalYear.id));
        return true;
      }

      throw new Error(res.Message);
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  useEffect(() => {
    let delay = 30 * 1000;
    let timeout: NodeJS.Timeout | null = null;
    firstMount.current = true;
    if (fiscalYear && fiscalYear.id) {
      // fetchCommentsList(fiscalYear.id);
      const update = async () => {
        try {
          if (firstMount.current) {
            setRequestState((prevState) => ({
              ...prevState,
              loading: true,
            }));
            firstMount.current = false;
          }

          const res = await CommentsService.get(fiscalYear.id);

          if (res.IsSuccess) {
            setRequestState((prevState) => ({
              ...prevState,
              comments: res.Comments,
              loading: false,
            }));

            delay = 30 * 1000;
            timeout = setTimeout(update, delay);
          } else {
            throw new Error(res.Message);
          }
        } catch (err) {
          console.error(err);

          setRequestState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [String(err)] },
          }));

          delay = delay * 2;
          timeout = setTimeout(update, delay);
        }
      };

      update();
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [fiscalYear]);

  return {
    requestState,
    handleInitError,
    addComment,
    updateComment,
    deleteComment,
    markAsRead,
  };
};

export default useCommentsData;
