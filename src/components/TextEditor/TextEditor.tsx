import { useState, useEffect, useRef } from 'react';

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';

import ControlsPanel, { Control } from './ControlsPanel';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  OrderedListIcon,
  UnorderedListIcon,
} from 'components/Icons';

import { useStyles } from './style';

const controls: Control[] = [
  { icon: BoldIcon, style: 'BOLD', type: 'inline' },
  { icon: ItalicIcon, style: 'ITALIC', type: 'inline' },
  {
    icon: UnderlineIcon,
    style: 'UNDERLINE',
    type: 'inline',
    divider: true,
    offset: false,
  },
  { icon: UnorderedListIcon, type: 'block', style: 'unordered-list-item' },
  { icon: OrderedListIcon, type: 'block', style: 'ordered-list-item' },
];

// const t = `
// {"blocks":[{"key":"2li9t","text":"test string. code ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"36jc5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"18vk5","text":"some underlined text","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"6vvao","text":"ordered list 1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eppi9","text":"ordered list 2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5njvp","text":"ordered list 3 bold item","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":24,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"6gh8j","text":"some test string","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}
// `;
// EditorState.createWithContent(convertFromRaw(JSON.parse(t)))

const TextEditor = () => {
  const classes = useStyles();

  const editorRef = useRef<Editor>(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div>
      <ControlsPanel
        controls={controls}
        onToggleInlineStyle={toggleInlineStyle}
        onToggleBlockType={toggleBlockType}
        currentInlineStyle={editorState.getCurrentInlineStyle()}
      />
      <div className={classes.editorWrapper}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default TextEditor;
