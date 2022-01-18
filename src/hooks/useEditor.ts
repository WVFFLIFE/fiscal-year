import { useState } from 'react';
import useMountedEffect from 'hooks/useMountedEffect';
import _toLower from 'lodash/toLower';

import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
  CompositeDecorator,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import DefaultHighlight from 'components/Highlight/Default';

export interface EditorData {
  text?: string | null;
  formatted?: string | null;
  html?: string | null;
}

export function convertDataToState(
  editorData: EditorData | null,
  searchTerm?: string
) {
  if (!editorData) return EditorState.createEmpty();
  const { text, formatted } = editorData;

  let editorState;

  try {
    if (formatted) {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(formatted))
      );
    } else if (text) {
      editorState = EditorState.createWithContent(
        ContentState.createFromText(text)
      );
    } else {
      editorState = EditorState.createEmpty();
    }
  } catch (err) {
    console.error(err);
    if (text) {
      editorState = EditorState.createWithContent(
        ContentState.createFromText(text)
      );
    } else {
      editorState = EditorState.createEmpty();
    }
  }

  return searchTerm
    ? EditorState.set(editorState, {
        decorator: generateDecorator(searchTerm),
      })
    : editorState;
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

interface Options {
  searchTerm?: string;
}

const generateDecorator = (highlightTerm: string) => {
  const regex = new RegExp(highlightTerm, 'g');
  return new CompositeDecorator([
    {
      strategy: (contentBlock, callback) => {
        if (highlightTerm !== '') {
          findWithRegex(regex, contentBlock, callback);
        }
      },
      component: DefaultHighlight,
    },
  ]);
};

const findWithRegex = (regex: any, contentBlock: any, callback: any) => {
  const text = contentBlock.getText();
  let matchArr, start, end;
  while ((matchArr = regex.exec(_toLower(text))) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    callback(start, end);
  }
};

const useEditor = (
  editorData: EditorData | null = null,
  options: Options = { searchTerm: '' }
) => {
  const { searchTerm } = options;

  const [editorState, setEditorState] = useState<EditorState>(() =>
    convertDataToState(editorData, searchTerm)
  );

  useMountedEffect(() => {
    setEditorState(convertDataToState(editorData, searchTerm));
  }, [editorData]);

  useMountedEffect(() => {
    if (searchTerm) {
      setEditorState(
        EditorState.set(editorState, {
          decorator: generateDecorator(searchTerm),
        })
      );
    } else {
      setEditorState(convertDataToState(editorData, searchTerm));
    }
  }, [searchTerm]);

  return [editorState, setEditorState] as const;
};

export default useEditor;
