import { useState, useCallback, useEffect, useRef } from 'react';
import useStateSelector from 'hooks/useStateSelector';
import useEditor, {
  convertStateToData,
  convertDataToState,
  EditorData,
} from 'hooks/useEditor';

import { EditorState } from 'draft-js';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';

interface HookOptions {
  activeId: string | null;
  prevId: string | null;
  id: string;
  editorData: EditorData;
  onSave(id: string, editorData: EditorData, cb?: () => void): Promise<unknown>;
  onSelectArticle(id: string | null): void;
}

const useArticleEditorData = (options: HookOptions) => {
  const { activeId, prevId, id, editorData, onSave, onSelectArticle } = options;

  const prevEditorState = useRef<EditorState>(convertDataToState(editorData));

  const searchTerm = useStateSelector(
    (state) => state.generalPage.filters.searchTerm
  );
  const [editorState, changeEditorState] = useEditor(editorData, {
    searchTerm,
  });
  const [activeEditMode, setActiveEditMode] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChangeEditorState = useCallback(
    (newEditorState: EditorState) => {
      if (newEditorState.getLastChangeType() === 'insert-characters') {
        setTouched(true);
      }

      changeEditorState(newEditorState);
    },
    [changeEditorState]
  );

  const handleSelectArticle = () => {
    onSelectArticle(id);
  };

  const handleUnselectArticle = () => {
    setTouched(false);
    onSelectArticle(null);
    changeEditorState(prevEditorState.current);
  };

  const handleSaveCurrentArticle = async () => {
    const editorData = convertStateToData(editorState);
    await onSave(id, editorData, handleUnselectArticle);
  };

  const handleSavePrevArticle = async () => {
    const editorData = convertStateToData(editorState);

    const untouch = () => setTouched(false);

    await onSave(id, editorData, untouch);
  };

  useEffect(() => {
    setActiveEditMode(activeId === id && !activeEditMode);
  }, [activeId]);

  useEffect(() => {
    if (!activeEditMode && activeId && prevId === id && touched) {
      handleSavePrevArticle();
    }
  }, [activeEditMode]);

  useEffect(() => {
    if (touched) {
      unsavedChangesTracker.addSaveAction(async () => {
        await handleSaveCurrentArticle();
        return true;
      });
    } else {
      unsavedChangesTracker.resetSaveAction();
    }
  }, [touched, editorState]);

  return {
    activeEditMode,
    editorState,
    handleChangeEditorState,
    handleSaveCurrentArticle,
    handleSelectArticle,
    handleUnselectArticle,
  };
};

export default useArticleEditorData;
