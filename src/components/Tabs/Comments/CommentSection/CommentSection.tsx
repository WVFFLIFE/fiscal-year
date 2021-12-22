import { EditorState } from 'draft-js';

import TextEditor from 'components/TextEditor';
import Avatar from '../Avatar';

import { useStyles } from './style';

interface CommentSectionProps {
  editorState: EditorState;
  onChangeEditorState: (editorState: EditorState) => void;
  placeholder?: string;
  avatarSrc?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  editorState,
  onChangeEditorState,
  placeholder,
  avatarSrc,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <Avatar src={avatarSrc} />
      </div>
      <TextEditor
        placeholder={placeholder}
        editorState={editorState}
        onChangeEditorState={onChangeEditorState}
      />
    </div>
  );
};

export default CommentSection;
