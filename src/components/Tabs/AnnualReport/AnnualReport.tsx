import { memo } from 'react';
import useAnnualReportData from './useAnnualReportData';

import Box from '@mui/material/Box';
import ArticleEditor from 'components/ArticleEditor';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';

const AnnualReport = () => {
  const {
    articleId,
    columns,
    requestState,
    isClosed,
    handleSelectArticle,
    handleSaveArticle,
    handleInitError,
  } = useAnnualReportData();

  return (
    <Box>
      {columns.map((column) => {
        return (
          <ArticleEditor
            key={column.id}
            activeId={articleId.current}
            prevId={articleId.prev}
            data={column.editorData}
            disabled={isClosed}
            id={column.id}
            maxCharactersLength={column.maxLength}
            singleline={column.singleline}
            title={column.label}
            onSave={handleSaveArticle}
            onSelectArticle={handleSelectArticle}
          />
        );
      })}
      <Backdrop loading={requestState.loading} />
      <DialogError error={requestState.error} initError={handleInitError} />
    </Box>
  );
};

export default memo(AnnualReport);
