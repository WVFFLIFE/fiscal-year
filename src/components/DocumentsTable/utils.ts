function notEmpty(list: any[]) {
  return !!list.length;
}

export function isSelected(selectedList: string[], itemIdsList: string[]) {
  return (
    notEmpty(selectedList) &&
    notEmpty(itemIdsList) &&
    itemIdsList.every((itemId) => selectedList.includes(itemId))
  );
}

export function isIndeterminated(
  selectedList: string[],
  itemIdsList: string[]
) {
  return (
    notEmpty(selectedList) &&
    notEmpty(itemIdsList) &&
    itemIdsList.some((itemId) => selectedList.includes(itemId))
  );
}
