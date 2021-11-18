import { DocumentModel, FolderModel } from 'models';

import _get from 'lodash/get';

function isPublished(item: FolderModel | DocumentModel) {
  return _get(item, 'Values.Published') === 'True';
}

export default isPublished;
