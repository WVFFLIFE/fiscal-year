import { FolderPickerItemModel, SelectedFolder } from './FolderPicker';

export function isSelectedInChain(
  item: FolderPickerItemModel,
  selected: SelectedFolder | null
): boolean {
  if (!selected) return false;

  return item.folders.some((item) => {
    if (item.id === selected.id) return true;

    return isSelectedInChain(item, selected);
  });
}
