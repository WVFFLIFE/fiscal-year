import { DocumentModel, FolderModel } from 'services';

export function isSelectedAll(
  activeFolder: FolderModel,
  selected: (FolderModel | DocumentModel)[]
) {
  return [...activeFolder.Folders, ...activeFolder.Documents].every(
    (entity) => {
      return selected.some((selectedEntity) => selectedEntity.Id === entity.Id);
    }
  );
}

export function isItemSelected(
  item: DocumentModel | FolderModel,
  selected: (FolderModel | DocumentModel)[]
) {
  return selected.some((selectedItem) => {
    return selectedItem.Id === item.Id;
  });
}

export function isIndeterminated(
  activeFolder: FolderModel,
  selected: (FolderModel | DocumentModel)[]
) {
  return [...activeFolder.Documents, ...activeFolder.Folders].some((entity) => {
    return selected.some((selectedEntity) => selectedEntity.Id === entity.Id);
  });
}
