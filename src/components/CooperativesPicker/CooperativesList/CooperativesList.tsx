import { CommonCooperativeModel } from 'models';

import {
  AutoSizer,
  List,
  ListRowRenderer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import CooperativesListItem from './CooperativesListItem';
import 'react-virtualized/styles.css'; // only needs to be imported once

import { useStyles } from './style';

export interface CooperativesListProps<T extends CommonCooperativeModel> {
  className?: string;
  multiple: boolean;
  cooperatives: T[];
  selected: T[];
  onClickItem(cooperative: T, selected: boolean): void;
}

const ITEM_HEIGHT = 41;
const rowCache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: ITEM_HEIGHT,
  defaultHeight: ITEM_HEIGHT,
});

const CooperativesList = <T extends CommonCooperativeModel>({
  className,
  multiple,
  cooperatives,
  selected,
  onClickItem,
}: CooperativesListProps<T>) => {
  const classes = useStyles();

  const rowRendered: ListRowRenderer = (props) => {
    const cooperative = cooperatives[props.index];
    const isSelected = selected.some(
      (currentCooperative) => currentCooperative.Id === cooperative.Id
    );

    return (
      <CellMeasurer
        cache={rowCache}
        columnIndex={0}
        key={props.key}
        style={props.style}
        rowIndex={props.index}
        parent={props.parent}
      >
        <CooperativesListItem
          key={props.key}
          multiple={multiple}
          cooperative={cooperative}
          selected={isSelected}
          onClick={onClickItem}
          style={props.style}
        />
      </CellMeasurer>
    );
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        minWidth: !!cooperatives.length ? 400 : 0,
        height:
          cooperatives.length > 5
            ? ITEM_HEIGHT * 5
            : ITEM_HEIGHT * cooperatives.length,
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <List
            className={classes.menuList}
            height={height}
            rowHeight={rowCache.rowHeight}
            rowCount={cooperatives.length}
            width={width}
            rowRenderer={rowRendered}
            deferredMeasurementCache={rowCache}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default CooperativesList;
