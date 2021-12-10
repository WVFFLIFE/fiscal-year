import { FC } from 'react';
import useConsumptionData from './useConsumptionData';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import { SubTitle } from 'components/Styled';
import ConsumtpionTable from './ConsumtpionTable';
import Dropzone from 'components/Dropzone';
import ImagePreview from 'components/ImagePreview';
import DialogError from 'components/DialogError';
import CheckboxControl from 'components/CheckboxControl';
import Backdrop from 'components/Backdrop';

import { useStyles } from './style';

const Consumption: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    isClosed,
    deleting,
    error,
    loading,
    progress,
    saving,
    src,
    uploading,
    handleInitError,
    consumptionData,
    addConsumptionReportToClosingTheBookReport,
    handleChangeAddConsumptionReportToClosingTheBookReport,
    handleSaveConsumptionMeter,
    handleChangeCurrentFile,
    handleDeleteConsumptionImage,
  } = useConsumptionData();

  if (!consumptionData) return null;

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" marginBottom="20px">
        <Box flex={1} marginRight="20px">
          <SubTitle className={classes.subtitle}>
            {t('#tab.consumption.subtitle.waterconsumption')}
          </SubTitle>
          <ConsumtpionTable
            data={consumptionData}
            onSaveConsumption={handleSaveConsumptionMeter}
            disabled={isClosed}
          />
        </Box>
        <Box flex={1}>
          <SubTitle className={classes.subtitle}>
            {t('#tab.consumption.subtitle.meterbasedconsumption')}
          </SubTitle>
          <Box display="flex">
            <Dropzone
              className={classes.dropzone}
              maxFiles={1}
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleChangeCurrentFile}
              disabled={isClosed}
            />
            <ImagePreview
              className={classes.preview}
              loading={loading}
              uploading={uploading}
              deleting={deleting}
              src={src}
              progress={progress}
              onDelete={handleDeleteConsumptionImage}
              overviewTitle={t(
                '#tab.consumption.subtitle.meterbasedconsumption'
              )}
              disabled={isClosed}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <CheckboxControl
          disabled={isClosed}
          checked={addConsumptionReportToClosingTheBookReport}
          onChange={handleChangeAddConsumptionReportToClosingTheBookReport}
          label={t(
            '#control.checkbox.addconsumptionreporttoclosingthebookreport'
          )}
        />
      </Box>
      <Backdrop loading={saving} />
      <DialogError error={error} initError={handleInitError} />
    </Box>
  );
};

export default Consumption;
