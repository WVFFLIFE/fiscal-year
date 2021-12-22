import { ErrorModel } from 'models';

import Loader from 'components/Loader';
import DialogError from 'components/DialogError';

interface SuspenceFacadeProps {
  loading: boolean;
  error: ErrorModel | null;
  onInitError: () => void;
  loaderSize?: number;
}

const SuspenceFacade: React.FC<SuspenceFacadeProps> = ({
  loading,
  loaderSize = 40,
  error,
  onInitError,
  children,
}) => {
  if (loading) return <Loader size={loaderSize} />;

  return (
    <>
      {children}
      <DialogError error={error} initError={onInitError} />
    </>
  );
};

export default SuspenceFacade;
