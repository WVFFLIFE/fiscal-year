import {
  forwardRef,
  memo,
  MouseEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from 'react';

import Dropdown from './Dropdown';
import Search from 'components/controls/PickerSearch';
import { IconButton } from 'components/Styled';
import { SearchIcon, CloseIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles, useBodyStyles } from './style';

interface PageSearchProps {
  disabled?: boolean;
  searchTerm: string;
  onChange(searchTerm: string): void;
}

interface BodyProps extends PageSearchProps {}

const Body = forwardRef<HTMLDivElement, BodyProps>((props, ref) => {
  const classes = useBodyStyles();

  const { searchTerm, onChange } = props;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleChangeDefaultSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInitSearchTerm = () => {
    onChange('');
    focusInput();
  };

  useEffect(() => {
    return () => {
      onChange('');
    };
  }, []);

  return (
    <div className={classes.wrapper} ref={ref}>
      <SearchIcon className={classes.searchIcon} />
      <Search
        autoFocus
        className={classes.input}
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleChangeDefaultSearchTerm}
      />
      <IconButton className={classes.closeBtn} onClick={handleInitSearchTerm}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
    </div>
  );
});

const PageSearch: React.FC<PageSearchProps> = ({
  searchTerm,
  onChange,
  disabled = false,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  return (
    <>
      <IconButton
        disabled={disabled}
        disableRipple
        onClick={disabled ? undefined : handleClick}
        className={clsx(classes.btn, {
          [classes.fill]: !!searchTerm,
          [classes.open]: open,
        })}
      >
        {open ? (
          <CloseIcon className={classes.icon} />
        ) : (
          <SearchIcon className={classes.icon} />
        )}
      </IconButton>
      <Dropdown open={open} anchorEl={anchorEl} placement="bottom-end">
        <Body searchTerm={searchTerm} onChange={onChange} />
      </Dropdown>
    </>
  );
};

export default memo(PageSearch);
