import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { User } from '../../user/entities';

interface AuthContextValue {
  authenticatedUser?: User;
  setAuthenticatedUser: Dispatch<SetStateAction<User>>;
}

interface Props {
  children: ReactNode;
}

export const AuthenticationContext = createContext<AuthContextValue>(null);

export const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User>();

  return (
    <AuthenticationContext.Provider
      value={{ authenticatedUser, setAuthenticatedUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
