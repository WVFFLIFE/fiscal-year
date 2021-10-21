import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonProps } from '@mui/material/Button';
import Button from 'components/Button';
import { PlusIcon, ArrowIcon, TemplateIcon, CopyIcon } from 'components/Icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import clsx from 'clsx';
import { useStyles } from './style';

const AddFiscalYearButton: React.FC<ButtonProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickItem = () => {
    handleCloseMenu();
  };

  return (
    <>
      <Button
        {...props}
        onClick={handleOpenMenu}
        className={clsx(classes.addBtn, props.className)}
        classes={{
          startIcon: classes.btnIcon,
          endIcon: classes.btnIcon,
          ...props.classes,
        }}
        label={t('#button.addfy')}
        startIcon={<PlusIcon />}
        endIcon={
          <ArrowIcon
            className={clsx(classes.arrowIcon, {
              [classes.rotatedArrowIcon]: !!anchorEl,
            })}
          />
        }
      />
      <Menu
        open={!!anchorEl}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: -4,
          horizontal: 'right',
        }}
        PaperProps={{
          className: classes.list,
        }}
      >
        <MenuItem onClick={handleClickItem} className={classes.menuItem}>
          <TemplateIcon className={classes.menuItemIcon} />
          From template
        </MenuItem>
        <MenuItem onClick={handleClickItem} className={classes.menuItem}>
          <CopyIcon className={classes.menuItemIcon} />
          Copy existing fiscal year
        </MenuItem>
      </Menu>
    </>
  );
};

export default AddFiscalYearButton;
