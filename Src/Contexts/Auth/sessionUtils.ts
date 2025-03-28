
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const refreshSession = async (
  refreshAttempts: number, 
  maxRefreshAttempts: number, 
  onSuccess: (data: any) => void, 
  onMaxAttemptsReached: () => Promise<void>
) => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Session refresh failed:', error.message);
      if (refreshAttempts < maxRefreshAttempts) {
        // Retry after a delay with exponential backoff
        const delay = Math.pow(2, refreshAttempts) * 1000;
        console.log(`Retrying session refresh in ${delay}ms (attempt ${refreshAttempts + 1}/${maxRefreshAttempts})`);
        setTimeout(() => refreshSession(refreshAttempts + 1, maxRefreshAttempts, onSuccess, onMaxAttemptsReached), delay);
      } else {
        toast.error('Unable to restore your session. Please log in again.');
        await onMaxAttemptsReached();
      }
      return;
    }
    
    onSuccess(data);
  } catch (error: any) {
    console.error('Error in refreshSession:', error.message);
  }
};
