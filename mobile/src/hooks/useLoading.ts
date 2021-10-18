import { useRedux } from './useRedux';
import { setIsLoading, setIsNotLoading } from '../store/slices/loading';

export function useLoading() {
  const { selector, dispatch } = useRedux();

  const { isLoading } = selector(state => state.loading);

  const enableLoading = () => dispatch(setIsLoading());
  const disableLoading = () => dispatch(setIsNotLoading());

  return {
    isLoading,
    enableLoading,
    disableLoading,
  };
};