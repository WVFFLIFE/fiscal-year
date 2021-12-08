import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import { SubTitle } from 'components/Styled';
import ConsumtpionTable from './ConsumtpionTable';
import Dropzone from 'components/Dropzone';

import { useStyles } from './style';

const Consumption: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const data = {
    HeatEnergyOfHotWater: 40,
    ConsumptionOfHotWater: 40,
    Population: 200,
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <Box flex={1} marginRight="20px">
        <SubTitle className={classes.subtitle}>
          {t('#tab.consumption.subtitle.waterconsumption')}
        </SubTitle>
        <ConsumtpionTable data={data} />
      </Box>
      <Box flex={1}>
        <SubTitle className={classes.subtitle}>
          {t('#tab.consumption.subtitle.meterbasedconsumption')}
        </SubTitle>
        <Box>
          <Dropzone className={classes.dropzone} maxFiles={1} />
        </Box>
      </Box>
    </Box>
  );
};

export default Consumption;
