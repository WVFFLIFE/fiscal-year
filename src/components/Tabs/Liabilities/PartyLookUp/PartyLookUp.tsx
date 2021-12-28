import useToggleSwitch from 'hooks/useToggleSwitch';

import Input from 'components/Input';
import ActionButton from 'components/ActionButton';
import SearchIcon from 'components/Icons/SearchIcon';
import Dialog from 'components/Dialog';
import LookUpRecords from './LookUpRecords';

import { useStyles } from './style';

export interface PartyLookUpProps {
  value?: string | null;
  onChange?(code: number): void;
}

const PartyLookUp: React.FC<PartyLookUpProps> = ({ value, onChange }) => {
  const classes = useStyles();

  const [showLookup, toggleLookup] = useToggleSwitch();

  return (
    <div className={classes.root}>
      <Input value={value} readonly />
      <ActionButton
        palette="darkBlue"
        className={classes.btn}
        onClick={toggleLookup}
      >
        <SearchIcon className={classes.searchIcon} />
      </ActionButton>
      <Dialog
        open={showLookup}
        maxWidth="md"
        handleClose={toggleLookup}
        title="Look up record"
      >
        <LookUpRecords />
      </Dialog>
    </div>
  );
};

export default PartyLookUp;
