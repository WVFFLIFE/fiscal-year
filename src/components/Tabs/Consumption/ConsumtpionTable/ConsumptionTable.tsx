import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsumptionModel } from 'utils/fiscalYear';

import Box from '@mui/material/Box';
import ConsumptionTableRow from './ConsumtpionTableRow';

interface ConsumptionTableProps {
  data: ConsumptionModel;
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

  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  const handleSetActiveRow = useCallback((id: string | null) => {
    setActiveRowId(id);
  }, []);

  return (
    <Box>
      <ConsumptionTableRow
        active={activeRowId === 'HeatEnergyOfHotWater'}
        data={data.heatEnergyOfHotWater}
        field="HeatEnergyOfHotWater"
        label={t('#tab.consumption.table.heatenergyofhotwater')}
        disabled={disabled}
        onSave={onSaveConsumption}
        onSelectActiveRow={handleSetActiveRow}
      />
      <ConsumptionTableRow
        active={activeRowId === 'ConsumptionOfHotWater'}
        data={data.consumptionOfHotWater}
        field="ConsumptionOfHotWater"
        label={t('#tab.consumption.table.consumptionofhotwater')}
        disabled={disabled}
        onSave={onSaveConsumption}
        onSelectActiveRow={handleSetActiveRow}
      />
      <ConsumptionTableRow
        active={activeRowId === 'Population'}
        data={data.population}
        field="Population"
        label={t('#tab.consumption.table.population')}
        disabled={disabled}
        onSave={onSaveConsumption}
        onSelectActiveRow={handleSetActiveRow}
      />
    </Box>
  );
};

export default ConsumptionTable;
