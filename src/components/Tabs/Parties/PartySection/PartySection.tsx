import { memo, useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PartyModel } from 'utils/fiscalYear';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { Column, SortModel } from 'models';

import DefaultTable from 'components/DefaultTable';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ArrowIcon from 'components/Icons/ArrowIcon';

import clsx from 'clsx';
import { useStyles } from './style';

interface PartySectionProps {
  /**
   * List of parties
   */
  parties: PartyModel[];
  /**
   * Section title
   */
  title: string;
  /**
   * Set property to expand/collapse section
   * @default false;
   */
  expanded?: boolean;
}

const defaultSortParams: SortModel<PartyModel> = {
  order: 'asc',
  orderBy: null,
  type: 'alphanumeric',
};

const PartySection: FC<PartySectionProps> = ({
  title,
  parties,
  expanded: defaultExpanded,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [expanded, toggleExpanded] = useToggleSwitch(defaultExpanded);

  const tableRowProps = useMemo(
    () => ({
      className: classes.tableRow,
    }),
    [classes]
  );

  const tableCellProps = useMemo(
    () => ({
      className: classes.cellColor,
    }),
    [classes]
  );

  const columns: Column<PartyModel>[] = useMemo(
    () => [
      {
        label: '#tab.parties.table.role',
        field: 'role',
        align: 'left',
        bodyCellClassName: classes.semibold,
        style: { width: '40%' },
      },
      {
        label: '#tab.parties.table.name',
        field: 'name',
        align: 'left',
        style: { width: '40%' },
      },
      {
        label: '#tab.parties.table.startdate',
        field: 'startDate',
        align: 'right',
        type: 'date',
        style: { width: '10%' },
      },
      {
        label: '#tab.parties.table.enddate',
        field: 'endDate',
        align: 'right',
        type: 'date',
        style: { width: '10%' },
      },
    ],
    [classes]
  );

  return (
    <Box>
      <Box className={classes.row} onClick={toggleExpanded}>
        <Button className={classes.btn}>
          <ArrowIcon
            className={clsx(classes.arrow, {
              [classes.btnExpanded]: expanded,
            })}
          />
        </Button>
        <Box className={classes.cell}>
          <span className={classes.sectionName}>{t(title)}</span>
        </Box>
      </Box>
      <Collapse in={expanded}>
        <Box padding="20px" paddingTop={0}>
          <DefaultTable
            data={parties}
            columns={columns}
            size="small"
            sortParams={defaultSortParams}
            BodyRowProps={tableRowProps}
            BodyCellProps={tableCellProps}
          />
        </Box>
        <Box className={classes.billet}></Box>
      </Collapse>
    </Box>
  );
};

export default memo(PartySection);
