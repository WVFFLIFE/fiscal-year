import { getYearsList } from 'utils';

import { DateBlock } from 'components/Styled';

import { useStyles } from './style';

interface DecadeViewProps {
  date: Date | null;
  onChangeYear(year: number): void;
}

const DecadeView: React.FC<DecadeViewProps> = ({ date, onChangeYear }) => {
  const classes = useStyles();

  const yyyy = (date || new Date()).getFullYear();
  const yearsList = getYearsList(yyyy - 9, yyyy);

  return (
    <div className={classes.root}>
      {yearsList.map((year) => {
        return (
          <DateBlock key={year} onClick={() => onChangeYear(year)}>
            {year}
          </DateBlock>
        );
      })}
    </div>
  );
};

export default DecadeView;
