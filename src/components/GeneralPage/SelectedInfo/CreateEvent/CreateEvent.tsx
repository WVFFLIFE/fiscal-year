import { useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import useToggleSwitch from 'hooks/useToggleSwitch';

import useStateSelector from 'hooks/useStateSelector';

import { selectEvents } from 'selectors/generalPageSelectors';

import ActionButton from 'components/ActionButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { PlusIcon, ArrowIcon } from 'components/Icons';

import { useStyles } from './style';

const CreateEvent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const events = useStateSelector(selectEvents);

  const [openMenu, toggleMenuVisibility] = useToggleSwitch();

  return (
    <>
      <ActionButton
        className={classes.btn}
        ref={buttonRef}
        startIcon={<PlusIcon />}
        endIcon={<ArrowIcon />}
        onClick={toggleMenuVisibility}
        disabled={!!!events}
      >
        {t('#createevent.title')}
      </ActionButton>
      <Menu
        open={openMenu}
        onClose={toggleMenuVisibility}
        anchorEl={buttonRef.current}
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
        {events?.createBoardMeetingLink && (
          <li onClick={toggleMenuVisibility} role="menuitem">
            <MenuItem
              className={classes.link}
              href={events.createBoardMeetingLink}
              target="_blank"
              component="a"
              role="link"
            >
              {t('#createevent.boardmeeting')}
            </MenuItem>
          </li>
        )}
        {events?.createGeneralMeetingLink && (
          <li onClick={toggleMenuVisibility} role="menuitem">
            <MenuItem
              className={classes.link}
              href={events.createGeneralMeetingLink}
              target="_blank"
              component="a"
              role="link"
            >
              {t('#createevent.generalmeeting')}
            </MenuItem>
          </li>
        )}
        {events?.createAuditingLink && (
          <li onClick={toggleMenuVisibility} role="menuitem">
            <MenuItem
              className={classes.link}
              href={events.createAuditingLink}
              target="_blank"
              component="a"
              role="link"
            >
              {t('#createevent.auditing')}
            </MenuItem>
          </li>
        )}
      </Menu>
    </>
  );
};

export default memo(CreateEvent);
