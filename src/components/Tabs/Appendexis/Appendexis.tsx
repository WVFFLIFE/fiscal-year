import { memo } from 'react';
import useAppendexisData from './useAppendexisData';

import Box from '@mui/material/Box';
import ArticleEditor from 'components/ArticleEditor';

const Appendexis = () => {
  const { columns, isClosed, handleUpdateFiscalYear } = useAppendexisData();

  return (
    <Box>
      {columns.map((column, idx) => {
        return (
          <ArticleEditor
            key={idx}
            title={column.label}
            data={column.editorData}
            onSave={column.onSave}
            onUpdate={handleUpdateFiscalYear}
            disabled={isClosed}
          />
        );
      })}
    </Box>
  );
};

export default memo(Appendexis);
