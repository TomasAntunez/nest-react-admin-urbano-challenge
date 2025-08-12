import { useContext } from 'react';

import { AuthenticationContext } from '../contexts';

export const useAuth = () => useContext(AuthenticationContext);
