import { useState, useCallback } from 'react';
import useStateSelector from 'hooks/useStateSelector';
import useEditor, {
  convertStateToData,
  convertDataToState,
  EditorData,
} from 'hooks/useEditor';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { ErrorModel } from 'models';

import { BaseResponseModel } from 'services';

interface RequestState {
  loading: boolean;
  error: ErrorModel | null;
}

const useArticleEditorData = (
  editorData: EditorData,
  onSave: (
    text: string | null,
    formatted: string | null,
    html: string | null
  ) => Promise<BaseResponseModel | undefined>,
  onUpdate: () => Promise<unknown>
) => {
  const searchTerm = useStateSelector(
    (state) => state.generalPage.filters.searchTerm
  );
  const [requestState, setRequestState] = useState<RequestState>({
    loading: false,
    error: null,
  });
  const [editModeOn, handleToggleEditMode] = useToggleSwitch();
  const [editorState, handleChangeEditorState] = useEditor(editorData, {
    searchTerm,
  });

  const handleSave = useCallback(async () => {
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const req = convertStateToData(editorState);
      if (!req) {
        throw new Error(`EditorState is empty`);
      }

      const res = await onSave(
        req.text || null,
        req.formatted || null,
        req.html || null
      );

      if (!res) {
        throw new Error('Application error. onSave return undefined');
      }

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        handleToggleEditMode();

        onUpdate();
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  }, [editorState]);

  const handleCancelEditMode = useCallback(() => {
    handleToggleEditMode();
    handleChangeEditorState(convertDataToState(editorData));
  }, [editorData]);

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    requestState,
    editModeOn,
    editorState,
    handleToggleEditMode,
    handleChangeEditorState,
    handleSave,
    handleCancelEditMode,
    handleInitError,
  };
};

export default useArticleEditorData;
