import { getMonthsList } from 'utils';

import { DateBlock } from 'components/Styled';
import { useStyles } from './style';

const monthsList = getMonthsList();

interface MonthsViewProps {
  onChangeMonth(month: number): void;
}

const MonthsView: React.FC<MonthsViewProps> = ({ onChangeMonth }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {monthsList.map((month, idx) => {
        return (
          <DateBlock key={month} onClick={() => onChangeMonth(idx)}>
            {month}
          </DateBlock>
        );
      })}
    </div>
  );
};

export default MonthsView;
