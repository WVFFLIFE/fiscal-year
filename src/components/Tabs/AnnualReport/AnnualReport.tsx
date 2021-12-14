import { FC, memo } from 'react';
import useAnnualReportData from './useAnnualReportData';
import { AnnualReportModel } from 'utils/fiscalYear';

import Box from '@mui/material/Box';
import ArticleEditor from 'components/ArticleEditor';

interface AnnualReportProps {
  data: AnnualReportModel;
}

const AnnualReport: FC<AnnualReportProps> = ({ data }) => {
  const { columns, isClosed, updateFiscalYear } = useAnnualReportData(data);

  return (
    <Box>
      {columns.map((column, idx) => {
        return (
          <ArticleEditor
            key={idx}
            title={column.label}
            data={column.editorData}
            onSave={column.onSave}
            onUpdate={updateFiscalYear}
            disabled={isClosed}
          />
        );
      })}
    </Box>
  );
};

export default memo(AnnualReport);
