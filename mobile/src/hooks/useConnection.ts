import { useRedux } from "./useRedux";
import { setConnectionStatus } from '../store/slices/connection';

export function useConnection() {
  const { selector, dispatch } = useRedux();

  const { isConnected } = selector(state => state.connection);

  const setIsConnected = (connectionStatus: boolean | null) => dispatch(
    setConnectionStatus(connectionStatus)
  );

  return {
    isConnected,
    setIsConnected
  };
};