import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import useEditor, {
  EditorData,
  convertStateToData,
  convertDataToState,
} from 'hooks/useEditor';
import useToggleSwitch from 'hooks/useToggleSwitch';

import { Comment as CommentModel } from 'services/s';

const useCommentData = (
  comment: CommentModel,
  onUpdate: (req: {
    id: string;
    text: string | null;
    formatted: string | null;
  }) => Promise<boolean | undefined>,
  onDelete: (id: string) => Promise<boolean | undefined>,
  onMarkAsRead?: (commentId: string) => Promise<boolean | undefined>
) => {
  const editorData: EditorData = useMemo(
    () => ({
      text: comment.Description,
      formatted: comment.DescriptionFormatted,
    }),
    [comment]
  );

  const [isReadFlag, setIsReadFlag] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [marking, setMarking] = useState(false);
  const [editMode, toggleEditMode] = useToggleSwitch();
  const [replyMode, toggleReplyMode] = useToggleSwitch();
  const [showDeleteConfirmation, toggleShowDeleteConfirmation] =
    useToggleSwitch();
  const [editorState, setEditorState] = useEditor(editorData);

  const handleChangeIsReadFlag = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    if (checked) {
      setIsReadFlag(checked);
    }
  };

  const handleCloseEditMode = () => {
    toggleEditMode();
    setEditorState(convertDataToState(editorData));
  };

  const handleUpdateComment = async () => {
    const editorData = convertStateToData(editorState);

    setSaving(true);
    const success = await onUpdate({
      id: comment.Id,
      text: editorData.text || null,
      formatted: editorData.formatted || null,
    });

    if (success) {
      toggleEditMode();
    }

    setSaving(false);
  };

  const handleDeleteComment = async () => {
    setDeleting(true);

    const success = await onDelete(comment.Id);

    if (success) {
      toggleShowDeleteConfirmation();
    }

    setDeleting(true);
  };

  const handleMarkAsRead = async () => {
    if (!onMarkAsRead) return;
    setMarking(true);

    await onMarkAsRead(comment.Id);

    setMarking(false);
  };

  useEffect(() => {
    if (isReadFlag) {
      handleMarkAsRead();
    }
  }, [isReadFlag]);

  return {
    isReadFlag,
    marking,
    saving,
    deleting,
    editMode,
    replyMode,
    showDeleteConfirmation,
    toggleShowDeleteConfirmation,
    toggleEditMode,
    toggleReplyMode,
    editorState,
    setEditorState,
    handleUpdateComment,
    handleCloseEditMode,
    handleDeleteComment,
    handleChangeIsReadFlag,
  };
};

export default useCommentData;
