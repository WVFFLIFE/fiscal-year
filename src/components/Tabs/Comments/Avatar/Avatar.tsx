import UserIcon from 'components/Icons/UserIcon';

import clsx from 'clsx';
import { useStyles } from './style';

interface AvatarProps {
  src?: string | null;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 40 }) => {
  const classes = useStyles();
  return (
    <span
      className={clsx(classes.avatar, {
        [classes.avatarOffset]: !!!src,
      })}
      style={{ display: 'block', width: size, height: size }}
    >
      {src ? (
        <img className={classes.userPhoto} alt="Person Avatar" src={src} />
      ) : (
        <UserIcon className={classes.userIcon} />
      )}
    </span>
  );
};

export default Avatar;
