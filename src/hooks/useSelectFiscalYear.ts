import { useSelector } from 'react-redux';
import { selectFiscalYear } from 'selectors/generalPageSelectors';

const useSelectFiscalYear = () => {
  return useSelector(selectFiscalYear);
};

export default useSelectFiscalYear;
