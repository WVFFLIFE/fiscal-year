import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsumptionModel } from 'utils/fiscalYear';

import Box from '@mui/material/Box';
import ConsumptionTableRow from './ConsumtpionTableRow';

interface ConsumptionTableProps {
  data: ConsumptionModel;
  onSaveConsumption(
    option: Record<string, number>,
    cb?: () => void
  ): Promise<unknown>;
  disabled?: boolean;
}

type SelectedRowId = {
  prev: string | null;
  current: string | null;
};

const ConsumptionTable: React.FC<ConsumptionTableProps> = ({
  data,
  onSaveConsumption,
  disabled,
}) => {
  const { t } = useTranslation();

  const [selectedRowId, setSelectedRowId] = useState<SelectedRowId>({
    current: null,
    prev: null,
  });

  const handleSetActiveRow = useCallback((id: string | null) => {
    setSelectedRowId((prevState) => ({
      ...prevState,
      current: id,
      prev: id ? prevState.current : null,
    }));
  }, []);

  return (
    <Box>
      <ConsumptionTableRow
        activeId={selectedRowId.current}
        prevId={selectedRowId.prev}
        data={data.heatEnergyOfHotWater}
        field="HeatEnergyOfHotWater"
        label={t('#tab.consumption.table.heatenergyofhotwater')}
        disabled={disabled}
        onSave={onSaveConsumption}
        onSelectActiveRow={handleSetActiveRow}
      />
      <ConsumptionTableRow
        activeId={selectedRowId.current}
        prevId={selectedRowId.prev}
        data={data.consumptionOfHotWater}
        field="ConsumptionOfHotWater"
        label={t('#tab.consumption.table.consumptionofhotwater')}
        disabled={disabled}
        onSave={onSaveConsumption}
        onSelectActiveRow={handleSetActiveRow}
      />
      <ConsumptionTableRow
        activeId={selectedRowId.current}
        prevId={selectedRowId.prev}
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
