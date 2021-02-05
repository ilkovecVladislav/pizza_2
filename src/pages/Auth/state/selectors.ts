import { useSelector } from 'react-redux';

import type { RootState } from 'store';

export const useIsAuthorized = (): boolean =>
  useSelector((state: RootState) => state.user.isAuthorized);

export default useIsAuthorized;
