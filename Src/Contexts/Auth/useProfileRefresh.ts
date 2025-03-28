
import { useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { fetchProfile, Profile } from './profileUtils';

export function useProfileRefresh(
  user: User | null,
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>,
  setIsRefreshingProfile: React.Dispatch<React.SetStateAction<boolean>>,
  setProfileError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const refreshProfile = useCallback(async (): Promise<Profile | null> => {
    if (!user) {
      console.warn('Cannot refresh profile: No user logged in');
      return null;
    }
    
    try {
      setIsRefreshingProfile(true);
      setProfileError(null);
      console.log('Refreshing profile for user:', user.id);
      
      const profileData = await fetchProfile(user.id);
      if (profileData) {
        setProfile(profileData);
        return profileData;
      }
      
      setProfileError('Unable to load profile data');
      console.warn('Profile refresh returned no data');
      return null;
    } catch (error: any) {
      console.error('Error refreshing profile:', error.message);
      setProfileError('Failed to load profile: ' + error.message);
      return null;
    } finally {
      setIsRefreshingProfile(false);
    }
  }, [user, setProfile, setIsRefreshingProfile, setProfileError]);

  return refreshProfile;
}
