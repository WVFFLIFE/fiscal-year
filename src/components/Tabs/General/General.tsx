import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useGeneralData from './useGeneralData';
import { MeetingModel, AuditingModel } from 'models';

import Box from '@mui/material/Box';
import GeneralInformationTable, {
  GeneralInformationDataModel,
} from './GeneralInformationTable';
import CommonTable, { CommonTableColumn } from 'components/CommonTable';
import Dropzone from 'components/Dropzone';
import Preview from './Preview';
import TypeLink from './TypeLink';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import { SubTitle } from 'components/Styled';

import clsx from 'clsx';
import { useStyles } from './style';

export interface GeneralTabProps {
  coopId: string;
  fiscalYearId: string;
  meetings: MeetingModel[];
  auditings: AuditingModel[];
  generalInformationList: GeneralInformationDataModel[];
  isClosed: boolean;
}

const General: React.FC<GeneralTabProps> = ({
  coopId,
  fiscalYearId,
  auditings,
  meetings,
  generalInformationList,
  isClosed,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
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
  } = useGeneralData(coopId, fiscalYearId);

  const meetingColumns: CommonTableColumn<MeetingModel>[] = useMemo(
    () => [
      {
        label: 'Meeting Type',
        accessor: 'Type',
        type: 'string',
        headStyle: { width: '70%' },
        render: (el) => <TypeLink href={el.Link}>{el.Type}</TypeLink>,
      },
      {
        label: 'Start Date & Time',
        accessor: 'PlannedStartingDate',
        type: 'datetime',
        cellClassName: clsx(classes.commonTableCell, classes.date),
      },
    ],
    [classes]
  );

  const auditingColumns: CommonTableColumn<AuditingModel>[] = useMemo(
    () => [
      {
        label: 'Auditing',
        accessor: 'Type',
        type: 'string',
        headStyle: { width: '70%' },
        cellClassName: clsx(classes.commonTableCell, classes.type),
        render: (el) => <TypeLink href={el.Link}>{el.Type}</TypeLink>,
      },
      {
        label: 'Start Date',
        accessor: 'PlannedStartingDate',
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
            list={meetings}
          />
          <CommonTable columns={auditingColumns} list={auditings} />
        </Box>
        <Box flex={1} paddingLeft={8}>
          <SubTitle className={classes.titleOffset}>
            {t('#tab.general.coverpageimage')}
          </SubTitle>
          <Box display="flex">
            <Dropzone
              className={classes.dropzone}
              maxFiles={1}
              disabled={isClosed}
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleChangeCurrentFile}
            />
            <Preview
              className={classes.preview}
              loading={loading}
              uploading={uploading}
              deleting={deleting}
              src={src}
              progress={progress}
              handleDeleteCurrentFile={handleDeleteCurrentFile}
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
