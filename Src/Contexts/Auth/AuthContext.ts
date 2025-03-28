
import { User, Session } from '@supabase/supabase-js';
import { createContext } from 'react';
import { Profile } from './profileUtils';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<Profile | null>;
  isRefreshingProfile: boolean;
  profileError: string | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  signOut: async () => {},
  refreshProfile: async () => null,
  isRefreshingProfile: false,
  profileError: null,
});

export default AuthContext;
