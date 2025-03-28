
import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

export function useTokenRefreshScheduler(
  session: Session | null,
  handleSessionRefresh: () => void
) {
  useEffect(() => {
    if (!session) return;

    // Schedule periodic token refresh to prevent expiration
    // This is a safety net in addition to Supabase's auto refresh
    const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes
    const intervalId = setInterval(handleSessionRefresh, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [session, handleSessionRefresh]);
}
