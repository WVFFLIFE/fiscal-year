import { FolderModel, DocumentModel } from 'services';

import _has from 'lodash/has';

export default function isFolder(item: FolderModel | DocumentModel) {
  return _has(item, 'Documents');
}
