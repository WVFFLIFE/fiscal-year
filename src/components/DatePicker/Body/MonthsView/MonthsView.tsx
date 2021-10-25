import { eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';
import { localeFormat } from 'utils';

import { DateBlock } from 'components/Styled';
import { useStyles } from './style';

interface MonthsViewProps {
  date: Date | null;
  onChangeMonth(monthDate: Date): void;
}

const MonthsView: React.FC<MonthsViewProps> = ({ date, onChangeMonth }) => {
  const classes = useStyles();

  const tempDate = date || new Date();

  const list = eachMonthOfInterval({
    start: startOfYear(tempDate),
    end: endOfYear(tempDate),
  });

  return (
    <div className={classes.root}>
      {list.map((month, idx) => {
        return (
          <DateBlock
            key={month.toDateString()}
            onClick={() => onChangeMonth(month)}
          >
            {localeFormat(month, 'MMMM')}
          </DateBlock>
        );
      })}
    </div>
  );
};

export default MonthsView;
