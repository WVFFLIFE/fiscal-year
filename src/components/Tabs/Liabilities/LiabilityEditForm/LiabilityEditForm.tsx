import useLiabilityEditFormData from './useLiabilityEditFormData';

import SuspenceFacade from 'components/SuspenceFacade';
import LiabilityForm from '../LiabilityForm';

interface LiabilityEditFormProps {
  ids: string[];
  onClose(): void;
  onUpdate(): void;
}

const LiabilityEditForm: React.FC<LiabilityEditFormProps> = ({
  ids,
  onClose,
  onUpdate,
}) => {
  const { requestState, initialValues, handleInitError } =
    useLiabilityEditFormData(ids);

  return (
    <SuspenceFacade
      loading={requestState.loading}
      error={requestState.error}
      onInitError={handleInitError}
    >
      <LiabilityForm
        action="edit"
        initialValues={initialValues || undefined}
        onClose={onClose}
        onUpdate={onUpdate}
      />
    </SuspenceFacade>
  );
};

export default LiabilityEditForm;
