import { useStyles } from './style';

interface FullImageProps {
  src: string;
}

const FullImage: React.FC<FullImageProps> = ({ src }) => {
  const classes = useStyles();

  return <img className={classes.img} src={src} alt="Cover" />;
};

export default FullImage;
