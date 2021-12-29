import useToggleSwitch from 'hooks/useToggleSwitch';
import { Organization } from 'services/s';

import Input from 'components/Input';
import ActionButton from 'components/ActionButton';
import SearchIcon from 'components/Icons/SearchIcon';
import Dialog from 'components/Dialog';
import LookUpRecords from './LookUpRecords';

import { useStyles } from './style';

interface ClassNames {
  border?: string;
}

export interface PartyLookUpProps {
  value: string | null;
  onChange(organization: Organization): void;
  classes?: ClassNames;
}

const PartyLookUp: React.FC<PartyLookUpProps> = ({
  value,
  onChange,
  classes: propsClasses,
}) => {
  const classes = useStyles();

  const [showLookup, toggleLookup] = useToggleSwitch();

  return (
    <div className={classes.root}>
      <Input value={value} readonly classes={{ root: propsClasses?.border }} />
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
        <LookUpRecords onChange={onChange} onClose={toggleLookup} />
      </Dialog>
    </div>
  );
};

export default PartyLookUp;
