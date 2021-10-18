import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
} from 'react-redux';

import type { RootState, AppDispatch } from '../store';

export function useRedux() {
  const useAppDispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  return {
    dispatch: useAppDispatch,
    selector: useAppSelector,
  };
};
