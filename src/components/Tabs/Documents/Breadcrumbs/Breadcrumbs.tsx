import { memo, Fragment } from 'react';

import { FolderModel } from 'services';

import { HomeIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface BreadcrumbsProps {
  list: FolderModel[];
  selectItem(idx: number): void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ list, selectItem }) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      {list.length <= 1 ? (
        <HomeIcon className={classes.icon} />
      ) : (
        list.map((item, idx, arr) => {
          const isMain = idx === 0;
          const isActive = idx === arr.length - 1;
          const total = item.Folders.length + item.Documents.length;

          return (
            <Fragment key={item.Id}>
              {isMain ? (
                <>
                  <HomeIcon
                    className={clsx(classes.icon, classes.pointer)}
                    onClick={() => selectItem(idx)}
                  />
                  <span className={classes.divider}></span>
                </>
              ) : isActive ? (
                <>
                  <div className={clsx(classes.text, classes.activeFolder)}>
                    {item.Name}
                  </div>
                  <span className={classes.divider}></span>
                  <div>{total} elements</div>
                </>
              ) : (
                <>
                  <div
                    className={clsx(classes.text, classes.pointer)}
                    onClick={() => selectItem(idx)}
                  >
                    {item.Name}
                  </div>
                  <span className={classes.divider}></span>
                </>
              )}
            </Fragment>
          );
        })
      )}
    </div>
  );
};

export default memo(Breadcrumbs);
