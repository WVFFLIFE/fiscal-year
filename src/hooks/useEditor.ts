import { useState, useEffect } from 'react';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export interface EditorData {
  text?: string | null;
  formatted?: string | null;
  html?: string | null;
}

export function convertDataToState(editorData?: EditorData) {
  if (!editorData) return EditorState.createEmpty();
  const { text, formatted } = editorData;

  try {
    if (formatted) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(formatted))
      );
    }

    if (text) {
      return EditorState.createWithContent(ContentState.createFromText(text));
    }

    return EditorState.createEmpty();
  } catch (err) {
    if (text) {
      return EditorState.createWithContent(ContentState.createFromText(text));
    }
    return EditorState.createEmpty();
  }
}

export function convertStateToData(editorState: null): null;
export function convertStateToData(editrState: EditorState): EditorData;
export function convertStateToData(editorState: EditorState | null) {
  if (!editorState) return null;
  const formatted = convertToRaw(editorState.getCurrentContent());
  const editorData: EditorData = {
    text: editorState.getCurrentContent().getPlainText(),
    formatted: JSON.stringify(formatted),
    html: draftToHtml(formatted),
  };
  return editorData;
}

const useEditor = (editorData?: EditorData) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  useEffect(() => {
    if (editorData) {
      setEditorState(convertDataToState(editorData));
    }
  }, [editorData]);

  return [editorState, setEditorState] as const;
};

export default useEditor;
