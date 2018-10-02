import React from 'react';
type ContextProps = {
  uid?: String,
  clearUid?: Function,
  setUid(token: string, refresh: string): void
};

const user: ContextProps = {
  uid: null,
  clearUid: () => {},
  setUid: () => {}
};

const UserContext = React.createContext(user);
export default UserContext;
