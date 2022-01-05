import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'store';

const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useStateSelector;
