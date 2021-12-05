import { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import AddFiscalYearButton from 'components/AddFiscalYearButton';
import Title from 'components/Title';
import Box from '@mui/material/Box';
import { LockIcon, CopyIcon } from 'components/Icons';

import { useStyles } from './style';

interface TopBarProps {
  showFiscalYearBtns: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ showFiscalYearBtns }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const cls = useMemo(
    () => ({
      startIcon: classes.icon,
    }),
    [classes]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: (theme) => theme.spacing(5),
      }}
    >
      <Title>{t('#page.title')}</Title>
      {showFiscalYearBtns && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            size="large"
            className={classes.offsetRight}
            classes={cls}
            label={t('#button.lockfydata')}
            startIcon={<LockIcon />}
          />
          <Button
            className={classes.offsetRight}
            classes={cls}
            label={t('#button.copyfy')}
            startIcon={<CopyIcon />}
          />
          <AddFiscalYearButton />
        </Box>
      )}
    </Box>
  );
};

export default memo(TopBar);
