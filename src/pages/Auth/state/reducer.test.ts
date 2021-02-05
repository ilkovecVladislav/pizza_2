import userReducer, { logIn, logOut } from './reducer';

describe('user reducer', () => {
  describe('action creators', () => {
    it('logIn action creator', () => {
      expect(logIn()).toEqual({ type: 'user/logIn' });
    });
    it('logOut action creator', () => {
      expect(logOut()).toEqual({ type: 'user/logOut' });
    });
  });
  describe('action handlers', () => {
    it('login user', () => {
      const initialState = { isAuthorized: false };
      const action = { type: 'user/logIn' };

      expect(userReducer(initialState, action)).toEqual({ isAuthorized: true });
    });
    it('logout user', () => {
      const initialState = { isAuthorized: true };
      const action = { type: 'user/logOut' };

      expect(userReducer(initialState, action)).toEqual({ isAuthorized: false });
    });
  });
});
