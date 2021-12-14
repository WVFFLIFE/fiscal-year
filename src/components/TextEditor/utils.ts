import { EditorState } from 'draft-js';

export function calculateContentLength(editorState: EditorState) {
  const currentContent = editorState.getCurrentContent();
  const currentContentLength = currentContent.getPlainText().length;

  return currentContentLength;
}
