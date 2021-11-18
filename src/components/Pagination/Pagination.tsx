import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import usePagination from '@mui/material/usePagination';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ArrowIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface PagiantionProps {
  className?: string;
  rowsPerPage: number;
  totalItems: number;
  currentPage: number;
  rowsPerPageOptions: number[];
  onChangeCurrentPage(page: number): void;
  onChangeRowsPerPage(rows: number): void;
}

const Pagination: React.FC<PagiantionProps> = ({
  className,
  rowsPerPage,
  totalItems,
  currentPage,
  rowsPerPageOptions,
  onChangeCurrentPage,
  onChangeRowsPerPage,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { items } = usePagination({
    count: Math.ceil(totalItems / rowsPerPage),
    page: currentPage + 1,
    onChange: (e, page) => onChangeCurrentPage(page),
  });

  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    const { value } = e.target;

    onChangeRowsPerPage(Number(value));
  };

  const to =
    (currentPage + 1) * rowsPerPage > totalItems
      ? totalItems
      : (currentPage + 1) * rowsPerPage;

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.countWrapper}>
        <p className={classes.count}>
          {t('#pagination', {
            show: currentPage * rowsPerPage + 1,
            to,
            totalItems,
          })}
        </p>
      </div>
      <ul className={classes.ul}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                {...item}
                type="button"
                disabled={selected}
                className={clsx(classes.item, {
                  [classes.selectedItem]: selected,
                })}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                className={clsx(classes.nav, {
                  [classes.disabledNav]: item.disabled,
                })}
                {...item}
              >
                {t(`#pagination.direction.${type}`)}
              </button>
            );
          }

          return (
            <li key={index} className={classes.li}>
              {children}
            </li>
          );
        })}
      </ul>
      <div className={classes.flex}>
        <span className={classes.rowsPerPageTitle}>
          {t('#pagination.count.perpage')}:
        </span>
        <Select
          classes={{
            icon: classes.icon,
            root: classes.selectRoot,
            select: classes.select,
          }}
          onChange={handleChangeRowsPerPage}
          value={String(rowsPerPage)}
          variant="standard"
          IconComponent={ArrowIcon}
          disableUnderline
        >
          {rowsPerPageOptions.map((option) => {
            return (
              <MenuItem
                value={option}
                key={option}
                className={classes.menuItem}
              >
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default memo(Pagination);
