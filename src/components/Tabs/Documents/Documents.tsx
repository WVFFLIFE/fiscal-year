import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import ActionButton from 'components/ActionButton';
import {
  HomeIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  PublishedIcon,
  RefreshIcon,
  SharePointIcon,
  PlusIcon,
} from 'components/Icons';
import DocumentsTable from 'components/DocumentsTable';

import { useStyles } from './style';

const options: QuickFilterOption[] = [
  { id: 'published', label: 'Published' },
  { id: 'unpublished', label: 'Unpublished' },
];

const Documents = () => {
  const classes = useStyles();

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleChangeActiveFilter = useCallback((newFilter: string) => {
    setActiveFilter(newFilter);
  }, []);

  return (
    <Box>
      <Box className={classes.row}>
        <HomeIcon className={classes.icon} />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.row}
      >
        <QuickFilter
          itemClassName={classes.quickFilterItem}
          active={activeFilter}
          options={options}
          onChange={handleChangeActiveFilter}
        />
        <Box marginLeft="40px">
          <ActionButton className={classes.actionBtn} disabled>
            <EditIcon className={classes.actionIcon} />
          </ActionButton>
          <ActionButton className={classes.actionBtn} disabled>
            <DeleteIcon className={classes.actionIcon} />
          </ActionButton>
          <ActionButton className={classes.actionBtn} disabled>
            <DownloadIcon className={classes.actionIcon} />
          </ActionButton>
          <ActionButton className={classes.actionBtn} disabled>
            <PublishedIcon className={classes.actionIcon} />
          </ActionButton>
          <ActionButton className={classes.actionBtn}>
            <RefreshIcon className={classes.actionIcon} />
          </ActionButton>
          <ActionButton className={classes.actionBtn}>
            <SharePointIcon className={classes.actionIcon} />
          </ActionButton>
          <ActionButton className={classes.actionBtn} palette="darkBlue">
            <PlusIcon className={classes.actionIcon} />
          </ActionButton>
        </Box>
      </Box>
      <DocumentsTable
        documents={[
          {
            Id: 'q',
            Name: 'doc1',
            Size: 1504,
          },
          {
            Id: 'asd',
            Name: 'asc',
            Size: 2000,
          },
        ]}
      />
    </Box>
  );
};

export default Documents;
