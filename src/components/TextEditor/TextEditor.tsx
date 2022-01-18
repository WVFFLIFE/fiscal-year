import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { findDOMNode } from 'react-dom';

import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

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
  /** Style applied to root element  */
  root?: string;
  disabled?: string;
}

interface TextEditorProps {
  classes?: TextEditorClasses;
  disabled?: boolean;
  editorState: EditorState;
  maxCharactersLength?: number;
  placeholder?: string;
  singleline?: boolean;
  onChangeEditorState(editorState: EditorState): void;
}

function moveFocusToEnd(editorState: EditorState) {
  editorState = EditorState.moveSelectionToEnd(editorState);
  return EditorState.forceSelection(editorState, editorState.getSelection());
}

const TextEditor: React.FC<TextEditorProps> = ({
  classes: rootClasses,
  disabled = false,
  editorState,
  maxCharactersLength,
  placeholder,
  singleline,
  onChangeEditorState,
}) => {
  const classes = useStyles();

  const editorRef = useRef<Editor>(null);
  const [focused, setFocused] = useState(false);

  const focusEditor = () => {
    if (editorRef.current && !focused) {
      editorRef.current.focus();
      setFocused(true);

      onChangeEditorState(moveFocusToEnd(editorState));
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

  // const _getLengthOfSelectedText = () => {
  //   const currentSelection = editorState.getSelection();
  //   const isCollapsed = currentSelection.isCollapsed();

  //   let length = 0;

  //   if (!isCollapsed) {
  //     const currentContent = editorState.getCurrentContent();
  //     const startKey = currentSelection.getStartKey();
  //     const endKey = currentSelection.getEndKey();
  //     const startBlock = currentContent.getBlockForKey(startKey);
  //     const isStartAndEndBlockAreTheSame = startKey === endKey;
  //     const startBlockTextLength = startBlock.getLength();
  //     const startSelectedTextLength =
  //       startBlockTextLength - currentSelection.getStartOffset();
  //     const endSelectedTextLength = currentSelection.getEndOffset();
  //     const keyAfterEnd = currentContent.getKeyAfter(endKey);
  //     if (isStartAndEndBlockAreTheSame) {
  //       length +=
  //         currentSelection.getEndOffset() - currentSelection.getStartOffset();
  //     } else {
  //       let currentKey = startKey;

  //       while (currentKey && currentKey !== keyAfterEnd) {
  //         if (currentKey === startKey) {
  //           length += startSelectedTextLength + 1;
  //         } else if (currentKey === endKey) {
  //           length += endSelectedTextLength;
  //         } else {
  //           length += currentContent.getBlockForKey(currentKey).getLength() + 1;
  //         }

  //         currentKey = currentContent.getKeyAfter(currentKey);
  //       }
  //     }
  //   }

  //   return length;
  // };

  // const _handleBeforeInput = () => {
  //   const currentContent = editorState.getCurrentContent();
  //   const currentContentLength = currentContent.getPlainText('').length;
  //   const selectedTextLength = _getLengthOfSelectedText();

  //   if (currentContentLength - selectedTextLength > maxCharactersLength - 1) {
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // };

  // const _removeSelection = () => {
  //   const selection = editorState.getSelection();
  //   const startKey = selection.getStartKey();
  //   const startOffset = selection.getStartOffset();
  //   const endKey = selection.getEndKey();
  //   const endOffset = selection.getEndOffset();
  //   if (startKey !== endKey || startOffset !== endOffset) {
  //     const newContent = Modifier.removeRange(
  //       editorState.getCurrentContent(),
  //       selection,
  //       'forward'
  //     );
  //     const tempEditorState = EditorState.push(
  //       editorState,
  //       newContent,
  //       'remove-range'
  //     );
  //     onChangeEditorState(tempEditorState);
  //     return tempEditorState;
  //   }
  //   return editorState;
  // };

  // const _addPastedContent = (input: string, editorState: EditorState) => {
  //   const inputLength = editorState.getCurrentContent().getPlainText().length;
  //   let remainingLength = maxCharactersLength - inputLength;

  //   const newContent = Modifier.insertText(
  //     editorState.getCurrentContent(),
  //     editorState.getSelection(),
  //     input.slice(0, remainingLength)
  //   );
  //   onChangeEditorState(
  //     EditorState.push(editorState, newContent, 'insert-characters')
  //   );
  // };
  // const _handlePastedText = (pastedText: string) => {
  //   const currentContent = editorState.getCurrentContent();
  //   const currentContentLength = currentContent.getPlainText('').length;
  //   const selectedTextLength = _getLengthOfSelectedText();

  //   if (
  //     currentContentLength + pastedText.length - selectedTextLength >
  //     maxCharactersLength
  //   ) {
  //     const selection = editorState.getSelection();
  //     const isCollapsed = selection.isCollapsed();
  //     const tempEditorState = !isCollapsed ? _removeSelection() : editorState;
  //     _addPastedContent(pastedText, tempEditorState);

  //     return 'handled';
  //   }

  //   if (singleline) {
  //     onChangeEditorState(
  //       EditorState.push(
  //         editorState,
  //         Modifier.replaceText(
  //           editorState.getCurrentContent(),
  //           editorState.getSelection(),
  //           pastedText.replace(/\n/g, ' ')
  //         ),
  //         'insert-characters'
  //       )
  //     );

  //     requestAnimationFrame(() => {
  //       const editorNode = findDOMNode(editorRef.current);
  //       if (editorNode) {
  //         const scrollingContainer = (editorNode as Element).querySelector(
  //           '.public-DraftStyleDefault-block'
  //         );
  //         const context = document.createElement('canvas').getContext('2d');

  //         if (context && scrollingContainer) {
  //           context.font = window.getComputedStyle(editorNode as Element).font;

  //           const textUpToEndOfPaste = editorState
  //             .getCurrentContent()
  //             .getPlainText(' ')
  //             .substring(0, editorState.getSelection().getFocusOffset());
  //           const pastedTextWidthOffset =
  //             context.measureText(textUpToEndOfPaste);

  //           scrollingContainer.scrollLeft =
  //             pastedTextWidthOffset.width -
  //             (editorNode as Element).clientWidth / 2;
  //         }
  //       }
  //     });

  //     return 'handled';
  //   }
  //   return 'not-handled';
  // };

  const _handlePastedText = (pastedText: string) => {
    if (singleline) {
      onChangeEditorState(
        EditorState.push(
          editorState,
          Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            pastedText.replace(/\n/g, ' ')
          ),
          'insert-characters'
        )
      );

      requestAnimationFrame(() => {
        const editorNode = findDOMNode(editorRef.current);
        if (editorNode) {
          const scrollingContainer = (editorNode as Element).querySelector(
            '.public-DraftStyleDefault-block'
          );
          const context = document.createElement('canvas').getContext('2d');

          if (context && scrollingContainer) {
            context.font = window.getComputedStyle(editorNode as Element).font;

            const textUpToEndOfPaste = editorState
              .getCurrentContent()
              .getPlainText(' ')
              .substring(0, editorState.getSelection().getFocusOffset());
            const pastedTextWidthOffset =
              context.measureText(textUpToEndOfPaste);

            scrollingContainer.scrollLeft =
              pastedTextWidthOffset.width -
              (editorNode as Element).clientWidth / 2;
          }
        }
      });

      return 'handled';
    }
    return 'not-handled';
  };

  useEffect(() => {
    if (!disabled) {
      focusEditor();
    }
  }, [disabled]);

  const currentContentLength = useMemo(() => {
    return maxCharactersLength
      ? editorState.getCurrentContent().getPlainText().length
      : 0;
  }, [editorState, maxCharactersLength]);

  const isLimitExceeded = maxCharactersLength
    ? currentContentLength > maxCharactersLength
    : false;

  return (
    <div
      className={clsx(classes.root, {
        [classes.singleline]: singleline,
      })}
    >
      {!disabled && (
        <ControlsPanel
          className={rootClasses?.controlPanel}
          controls={controls}
          currentCharactersLength={currentContentLength}
          maxCharactersLength={maxCharactersLength}
          isLimitExceeded={isLimitExceeded}
          onToggleInlineStyle={handleToggleInlineStyle}
          onToggleBlockType={handleToggleBlockType}
          currentInlineStyle={editorState.getCurrentInlineStyle()}
        />
      )}
      <div
        className={clsx(classes.editorWrapper, rootClasses?.root, {
          [classes.editorWrapperSingleline]: singleline,
          [classes.focused]: focused,
          [classes.exceeded]: isLimitExceeded,
          [clsx(classes.disabled, rootClasses?.disabled)]: disabled,
        })}
        onClick={disabled ? undefined : focusEditor}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={onChangeEditorState}
          readOnly={disabled}
          onFocus={focusEditor}
          onBlur={onBlur}
          placeholder={placeholder}
          // handleBeforeInput={_handleBeforeInput}
          handlePastedText={_handlePastedText}
          handleReturn={singleline ? () => 'handled' : undefined}
        />
      </div>
    </div>
  );
};

export default TextEditor;
