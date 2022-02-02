import { useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';

import useToggleSwitch from 'hooks/useToggleSwitch';
import useStateSelector from 'hooks/useStateSelector';

import { selectEvents } from 'selectors/generalPageSelectors';

import ActionButton from 'components/ActionButton';
import Dropdown from 'components/Dropdown';
import { PlusIcon, ArrowIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const CreateEvent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const events = useStateSelector(selectEvents);

  const [openMenu, toggleMenuVisibility] = useToggleSwitch();

  const isDisabledOpenBtn = !!!events;

  return (
    <>
      <ActionButton
        className={classes.btn}
        ref={buttonRef}
        startIcon={<PlusIcon />}
        endIcon={
          <ArrowIcon
            className={clsx(classes.arrowIcon, { [classes.active]: openMenu })}
          />
        }
        onClick={toggleMenuVisibility}
        disabled={isDisabledOpenBtn}
      >
        {t('#createevent.title')}
      </ActionButton>
      <Dropdown
        open={openMenu}
        onClose={toggleMenuVisibility}
        anchorEl={buttonRef.current}
      >
        {events?.createBoardMeetingLink && (
          <Dropdown.Item
            className={classes.link}
            onClick={toggleMenuVisibility}
            href={events.createBoardMeetingLink}
            target="_blank"
            component="a"
            role="link"
          >
            {t('#createevent.boardmeeting')}
          </Dropdown.Item>
        )}
        {events?.createGeneralMeetingLink && (
          <Dropdown.Item
            className={classes.link}
            onClick={toggleMenuVisibility}
            href={events.createGeneralMeetingLink}
            target="_blank"
            component="a"
            role="link"
          >
            {t('#createevent.generalmeeting')}
          </Dropdown.Item>
        )}
        {events?.createAuditingLink && (
          <Dropdown.Item
            className={classes.link}
            onClick={toggleMenuVisibility}
            href={events.createAuditingLink}
            target="_blank"
            component="a"
            role="link"
          >
            {t('#createevent.auditing')}
          </Dropdown.Item>
        )}
      </Dropdown>
    </>
  );
};

export default memo(CreateEvent);
