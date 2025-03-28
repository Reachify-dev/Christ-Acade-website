
import { useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { refreshSession } from './sessionUtils';
import { fetchProfile, Profile } from './profileUtils';

export function useSessionRefresh(
  refreshAttempts: number,
  maxRefreshAttempts: number,
  setSession: React.Dispatch<React.SetStateAction<Session | null>>,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>,
  setProfileError: React.Dispatch<React.SetStateAction<string | null>>,
  setRefreshAttempts: React.Dispatch<React.SetStateAction<number>>,
  signOut: () => Promise<void>
) {
  const handleSessionRefresh = useCallback(() => {
    refreshSession(
      refreshAttempts, 
      maxRefreshAttempts,
      (data) => {
        setRefreshAttempts(0);
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          
          // Fetch profile after successful session refresh
          if (data.session.user) {
            fetchProfile(data.session.user.id).then(profileData => {
              if (profileData) {
                setProfile(profileData);
                setProfileError(null);
              } else {
                setProfileError('Unable to load profile data after session refresh');
              }
            });
          }
        }
      },
      signOut
    );
  }, [refreshAttempts, maxRefreshAttempts, setRefreshAttempts, setSession, setUser, setProfile, setProfileError, signOut]);

  return handleSessionRefresh;
}
