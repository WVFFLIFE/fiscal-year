import {
  memo,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
} from 'react';

import Menu from 'components/Menu';
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

interface BodyProps extends PageSearchProps {
  onClose(): void;
}

const Body: React.FC<BodyProps> = ({ searchTerm, onChange, onClose }) => {
  const classes = useBodyStyles();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [defaultSearchTerm, setDefaultSearchTerm] = useState(searchTerm);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleChangeDefaultSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setDefaultSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      onChange(defaultSearchTerm);
      onClose();
    }
  };

  return (
    <div className={classes.wrapper}>
      <SearchIcon className={classes.searchIcon} />
      <Search
        className={classes.input}
        ref={searchInputRef}
        value={defaultSearchTerm}
        onChange={handleChangeDefaultSearchTerm}
        onKeyPress={handleKeyPress}
      />
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

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

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
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: -4,
        }}
      >
        <Body
          searchTerm={searchTerm}
          onChange={onChange}
          onClose={handleClose}
        />
      </Menu>
    </>
  );
};

export default memo(PageSearch);
