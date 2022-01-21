import { KeyboardEvent } from 'react';
import { EditorState, DraftEditorCommand } from 'draft-js';
import useStateSelector from 'hooks/useStateSelector';

import { selectCommentsSettings } from 'selectors/settingsSelectors';

import TextEditor from 'components/TextEditor';
import Avatar from '../Avatar';

import { useStyles } from './style';

interface CommentSectionProps {
  editorState: EditorState;
  onChangeEditorState: (editorState: EditorState) => void;
  keyBindingFn?: (event: KeyboardEvent<any>) => DraftEditorCommand | null;
  placeholder?: string;
  avatarSrc?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  editorState,
  onChangeEditorState,
  keyBindingFn,
  placeholder,
  avatarSrc,
}) => {
  const classes = useStyles();

  const commentsSettings = useStateSelector(selectCommentsSettings);

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Avatar src={avatarSrc} />
      </div>
      <TextEditor
        placeholder={placeholder}
        editorState={editorState}
        keyBindingFn={keyBindingFn}
        onChangeEditorState={onChangeEditorState}
        maxCharactersLength={commentsSettings.commentMaxLength}
      />
    </div>
  );
};

export default CommentSection;
