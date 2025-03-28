
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useSignOut(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setProfile: React.Dispatch<React.SetStateAction<any | null>>,
  setUser: React.Dispatch<React.SetStateAction<any | null>>,
  setSession: React.Dispatch<React.SetStateAction<any | null>>,
  setProfileError: React.Dispatch<React.SetStateAction<string | null>>,
  setRefreshAttempts: React.Dispatch<React.SetStateAction<number>>
) {
  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        toast.error('Failed to sign out: ' + error.message);
        throw error;
      }
      
      setProfile(null);
      setUser(null);
      setSession(null);
      setProfileError(null);
      setRefreshAttempts(0);
    } catch (error: any) {
      console.error('Exception during sign out:', error.message);
      toast.error('An error occurred while signing out');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setProfile, setUser, setSession, setProfileError, setRefreshAttempts]);

  return signOut;
}
