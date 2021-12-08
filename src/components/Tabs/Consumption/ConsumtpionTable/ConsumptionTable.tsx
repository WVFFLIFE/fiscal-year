import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import ConsumptionTableRow from './ConsumtpionTableRow';

interface Data {
  HeatEnergyOfHotWater: number | null;
  ConsumptionOfHotWater: number | null;
  Population: number | null;
}

interface ConsumptionTableProps {
  data: Data;
  disabled?: boolean;
}

const ConsumptionTable: React.FC<ConsumptionTableProps> = ({
  data,
  disabled,
}) => {
  const { t } = useTranslation();

  const mock = () => new Promise(() => {});

  return (
    <Box>
      <ConsumptionTableRow
        data={data.HeatEnergyOfHotWater}
        label={t('#tab.consumption.table.heatenergyofhotwater')}
        disabled={disabled}
        onSave={mock}
      />
      <ConsumptionTableRow
        data={data.ConsumptionOfHotWater}
        label={t('#tab.consumption.table.consumptionofhotwater')}
        disabled={disabled}
        onSave={mock}
      />
      <ConsumptionTableRow
        data={data.Population}
        label={t('#tab.consumption.table.population')}
        disabled={disabled}
        onSave={mock}
      />
    </Box>
  );
};

export default ConsumptionTable;
