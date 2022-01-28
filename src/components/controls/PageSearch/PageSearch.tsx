import {
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

const Body: React.FC<BodyProps> = ({ searchTerm, onChange }) => {
  const classes = useBodyStyles();

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
    <div className={classes.wrapper}>
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
};

const PageSearch: React.FC<PageSearchProps> = ({
  searchTerm,
  onChange,
  disabled = false,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prevState) => (prevState ? null : e.currentTarget));
  };

  const open = !!anchorEl;

  return (
    <>
      <IconButton
        disabled={disabled}
        disableRipple
        onClick={disabled ? undefined : handleToggle}
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
