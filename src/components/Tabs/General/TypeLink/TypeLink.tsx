import clsx from 'clsx';
import { useStyles } from './style';

interface TypeLinkProps {
  href: string | null;
}

const TypeLink: React.FC<TypeLinkProps> = ({ href, children }) => {
  const classes = useStyles();

  return href ? (
    <a
      className={clsx(classes.text, classes.link)}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  ) : (
    <span className={classes.text}>{children}</span>
  );
};

export default TypeLink;
