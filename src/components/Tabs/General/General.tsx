import { useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import useGeneralData from './useGeneralData';
import { MeetingModel, AuditingModel, GeneralModel } from 'utils/fiscalYear';

import Box from '@mui/material/Box';
import GeneralInformationTable from './GeneralInformationTable';
import CommonTable, { CommonTableColumn } from 'components/CommonTable';
import Dropzone from 'components/Dropzone';
import ImagePreview from 'components/ImagePreview';
import TypeLink from './TypeLink';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import { SubTitle } from 'components/Styled';

import clsx from 'clsx';
import { useStyles } from './style';

export interface GeneralTabProps {
  data: GeneralModel;
}

const General: FC<GeneralTabProps> = ({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    generalInformationList,
    src,
    progress,
    loading,
    uploading,
    error,
    deleting,
    saving,
    handleInitError,
    handleChangeCurrentFile,
    handleDeleteCurrentFile,
    handleSaveFiscalYear,
  } = useGeneralData(data);

  const meetingColumns: CommonTableColumn<MeetingModel>[] = useMemo(
    () => [
      {
        label: '#tab.general.meetings.table.meetingtype',
        accessor: 'type',
        type: 'string',
        headStyle: { width: '70%' },
        render: (el) => <TypeLink href={el.link}>{el.type}</TypeLink>,
      },
      {
        label: '#tab.general.meetings.table.startdatetime',
        accessor: 'plannedStartingDate',
        type: 'datetime',
        cellClassName: clsx(classes.commonTableCell, classes.date),
      },
    ],
    [classes]
  );

  const auditingColumns: CommonTableColumn<AuditingModel>[] = useMemo(
    () => [
      {
        label: '#tab.general.auditing.table.auditing',
        accessor: 'type',
        type: 'string',
        headStyle: { width: '70%' },
        cellClassName: clsx(classes.commonTableCell, classes.type),
        render: (el) => <TypeLink href={el.link}>{el.type}</TypeLink>,
      },
      {
        label: '#tab.general.auditing.table.startdate',
        accessor: 'returnNeededDate',
        type: 'date',
        cellClassName: clsx(classes.commonTableCell, classes.date),
      },
    ],
    [classes]
  );

  return (
    <Box>
      <Box marginBottom={8}>
        <SubTitle className={classes.titleOffset}>
          {t('#tab.generalinformation')}
        </SubTitle>
        <GeneralInformationTable
          list={generalInformationList}
          disabled={data.isClosed}
          onSaveFiscalYear={handleSaveFiscalYear}
        />
      </Box>
      <Box display="flex" flexWrap="wrap">
        <Box flex={1}>
          <SubTitle className={classes.titleOffset}>
            {t('#tab.general.subtitle.events')}
          </SubTitle>
          <CommonTable
            className={classes.meetingTable}
            columns={meetingColumns}
            list={data.meetings}
          />
          <CommonTable columns={auditingColumns} list={data.auditings} />
        </Box>
        <Box flex={1} paddingLeft={8}>
          <SubTitle className={classes.titleOffset}>
            {t('#tab.general.coverpageimage')}
          </SubTitle>
          <Box display="flex">
            <Dropzone
              className={classes.dropzone}
              maxFiles={1}
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleChangeCurrentFile}
            />
            <ImagePreview
              className={classes.preview}
              loading={loading}
              uploading={uploading}
              deleting={deleting}
              src={src}
              progress={progress}
              onDelete={handleDeleteCurrentFile}
              overviewTitle={t('#tab.general.coverpageimage')}
            />
          </Box>
        </Box>
      </Box>
      <DialogError error={error} initError={handleInitError} />
      <Backdrop loading={saving} />
    </Box>
  );
};

export default General;
