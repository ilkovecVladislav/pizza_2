import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducer';
import useIsAuthorized from './selectors';

describe('useIsAuthorized hook', () => {
  it('returns is user authorized', () => {
    const store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          isAuthorized: true,
        },
      },
    });
    const { result } = renderHook(() => useIsAuthorized(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(true);
  });
});
