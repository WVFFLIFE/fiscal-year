import { useState, useRef, useCallback, useEffect } from 'react';

import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import { calculateContentLength } from './utils';

import ControlsPanel, { Control } from './ControlsPanel';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  OrderedListIcon,
  UnorderedListIcon,
} from 'components/Icons';

import clsx from 'clsx';
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

export interface TextEditorClasses {
  /**  Styles applied to the control panel */
  controlPanel?: string;
}

interface TextEditorProps {
  classes?: TextEditorClasses;
  disabled?: boolean;
  editorState: EditorState;
  maxCharactersLength?: number;
  onChangeEditorState(editorState: EditorState): void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  classes: rootClasses,
  disabled,
  editorState,
  maxCharactersLength = 2000,
  onChangeEditorState,
}) => {
  const classes = useStyles();

  const editorRef = useRef<Editor>(null);
  const [focused, setFocused] = useState(false);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      setFocused(true);
    }
  };

  const onBlur = () => {
    setFocused(false);
  };

  const handleToggleInlineStyle = useCallback(
    (style: string) => {
      if (!editorState) return;
      onChangeEditorState(RichUtils.toggleInlineStyle(editorState, style));
    },
    [editorState]
  );

  const handleToggleBlockType = useCallback(
    (blockType: string) => {
      if (!editorState) return;
      onChangeEditorState(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState]
  );

  const _getLengthOfSelectedText = () => {
    const currentSelection = editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength =
        startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);
      if (isStartAndEndBlockAreTheSame) {
        length +=
          currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }

          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }

    return length;
  };

  const _getSelectedText = () => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);

    return selectedText;
  };

  const _getSelectedPosition = () => {
    const selectionState = editorState.getSelection();
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();

    return { start, end };
  };

  const _handleBeforeInput = (text: string) => {
    const currentText = editorState.getCurrentContent().getPlainText();
    const currentTextLength = currentText.length;
    const totalLength = currentTextLength + 1;

    if (totalLength > maxCharactersLength) {
      const selectedText = _getSelectedText();

      if (selectedText) {
        const selectedPosition = _getSelectedPosition();

        const startText = currentText.substring(0, selectedPosition.start);
        const endText = currentText.substring(selectedPosition.end + 1);

        const newText = `${startText}${text}${endText}`;
        const editorState = EditorState.createWithContent(
          ContentState.createFromText(newText.slice(0, maxCharactersLength))
        );

        onChangeEditorState(editorState);
      }

      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  // const _handleBeforeInput = (pastedText: string) => {
  //   const currentContent = editorState.getCurrentContent();
  //   const currentContentLength =
  //     currentContent.getPlainText().length + pastedText.length;
  //   const selectedText = _getSelectedText();

  //   if (currentContentLength >= maxCharactersLength) {
  //     if (selectedText) {
  //       const { start, end } = _getSelectedPosition();
  //       const startStr = currentContent.getPlainText().substring(0, start);
  //       const endStr = currentContent.getPlainText().substring(end);
  //       const newStr = `${startStr}${pastedText}${endStr}`;
  //       const editorState = EditorState.createWithContent(
  //         ContentState.createFromText(newStr.slice(0, maxCharactersLength - 1))
  //       );
  //       onChangeEditorState(editorState);
  //     }

  //     return 'handled';
  //   } else {
  //     return 'not-handled';
  //   }
  // };

  // const _handlePastedText = (pastedText: string) => {
  //   const currentContent = editorState.getCurrentContent();
  //   const currentContentLength =
  //     currentContent.getPlainText().length + pastedText.length;
  //   const selectedText = _getSelectedText();
  //   const selectedTextLength = selectedText.length;

  //   if (
  //     currentContentLength + pastedText.length - selectedTextLength >
  //     maxCharactersLength
  //   ) {
  //     if (!selectedText) return 'not-handled';
  //     const editorState = EditorState.createWithContent(
  //       ContentState.createFromText(
  //         currentContent
  //           .getPlainText()
  //           .replace(selectedText, pastedText)
  //           .slice(0, maxCharactersLength - 1)
  //       )
  //     );
  //     onChangeEditorState(EditorState.moveFocusToEnd(editorState));
  //     return 'handled';
  //   } else {
  //     return 'not-handled';
  //   }
  // };

  useEffect(() => {
    if (!disabled) {
      focusEditor();
    }
  }, [disabled]);

  return (
    <div>
      {!disabled && (
        <ControlsPanel
          className={rootClasses?.controlPanel}
          controls={controls}
          onToggleInlineStyle={handleToggleInlineStyle}
          onToggleBlockType={handleToggleBlockType}
          currentInlineStyle={editorState.getCurrentInlineStyle()}
        />
      )}
      <div
        className={clsx(classes.editorWrapper, {
          [classes.focused]: focused,
        })}
        onClick={focusEditor}
      >
        <Editor
          editorState={editorState}
          onChange={onChangeEditorState}
          readOnly={disabled}
          onFocus={focusEditor}
          onBlur={onBlur}
          handleBeforeInput={_handleBeforeInput}
          // handlePastedText={_handlePastedText}
        />
      </div>
    </div>
  );
};

export default TextEditor;
