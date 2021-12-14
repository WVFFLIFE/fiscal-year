import { useState, useEffect, useMemo } from 'react';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export interface EditorData {
  text: string | null;
  formatted: string | null;
  html: string | null;
}

export function convertDataToState(editorData: EditorData) {
  const { text, formatted } = editorData;
  return formatted
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(formatted)))
    : text
    ? EditorState.createWithContent(ContentState.createFromText(text))
    : EditorState.createEmpty();
}

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

function checkEditorDataEquality(
  prev: EditorState | null,
  next: EditorState | null
) {
  const prevRaw = prev && convertToRaw(prev.getCurrentContent());
  const nextRaw = next && convertToRaw(next.getCurrentContent());

  return prevRaw === nextRaw;
}

const useEditor = (editorData: EditorData) => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);

  const isEditorDataEquals = useMemo(() => {
    const nextEditorState = convertDataToState(editorData);

    return checkEditorDataEquality(editorState, nextEditorState);
  }, [editorData, editorState]);

  useEffect(() => {
    if (!isEditorDataEquals) {
      setEditorState(convertDataToState(editorData));
    }
  }, [editorData, isEditorDataEquals]);

  return [editorState, setEditorState] as const;
};

export default useEditor;
