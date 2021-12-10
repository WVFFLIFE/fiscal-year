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
  onSaveConsumption(
    option: { [key: string]: number },
    cb?: () => void
  ): Promise<unknown>;
  disabled?: boolean;
}

const ConsumptionTable: React.FC<ConsumptionTableProps> = ({
  data,
  onSaveConsumption,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <ConsumptionTableRow
        data={data.HeatEnergyOfHotWater}
        field="HeatEnergyOfHotWater"
        label={t('#tab.consumption.table.heatenergyofhotwater')}
        disabled={disabled}
        onSave={onSaveConsumption}
      />
      <ConsumptionTableRow
        data={data.ConsumptionOfHotWater}
        field="ConsumptionOfHotWater"
        label={t('#tab.consumption.table.consumptionofhotwater')}
        disabled={disabled}
        onSave={onSaveConsumption}
      />
      <ConsumptionTableRow
        data={data.Population}
        field="Population"
        label={t('#tab.consumption.table.population')}
        disabled={disabled}
        onSave={onSaveConsumption}
      />
    </Box>
  );
};

export default ConsumptionTable;
