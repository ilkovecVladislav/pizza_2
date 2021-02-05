import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import useIsAuthorized from './selectors';

const mockStore = configureStore();

describe('useIsAuthorized hook', () => {
  it('returns is user authorized', () => {
    const initialState = {
      user: {
        isAuthorized: true,
      },
    };
    const store = mockStore(initialState);
    const { result } = renderHook(() => useIsAuthorized(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(true);
  });
});
