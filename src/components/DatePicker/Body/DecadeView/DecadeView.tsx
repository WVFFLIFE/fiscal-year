import {
  eachYearOfInterval,
  startOfYear,
  endOfYear,
  subYears,
  format,
} from 'date-fns';

import { DateBlock } from 'components/Styled';

import { useStyles } from './style';

interface DecadeViewProps {
  date: Date;
  onChangeYear(yearDate: Date): void;
}

const DecadeView: React.FC<DecadeViewProps> = ({ date, onChangeYear }) => {
  const classes = useStyles();

  const list = eachYearOfInterval({
    start: startOfYear(subYears(date, 9)),
    end: endOfYear(date),
  });

  return (
    <div className={classes.root}>
      {list.map((year) => {
        return (
          <DateBlock
            key={year.toDateString()}
            onClick={() => onChangeYear(year)}
          >
            {format(year, 'yyyy')}
          </DateBlock>
        );
      })}
    </div>
  );
};

export default DecadeView;
