
import React, { useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import AuthContext from './AuthContext';
import { Profile } from './profileUtils';
import { useSignOut } from './useSignOut';
import { useProfileRefresh } from './useProfileRefresh';
import { useSessionRefresh } from './useSessionRefresh';
import { useAuthStateListener } from './useAuthStateListener';
import { useTokenRefreshScheduler } from './useTokenRefreshScheduler';

const MAX_REFRESH_ATTEMPTS = 3;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(false);
  const [refreshAttempts, setRefreshAttempts] = useState(0);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Use custom hooks to separate concerns
  const signOut = useSignOut(
    setIsLoading,
    setProfile,
    setUser,
    setSession,
    setProfileError,
    setRefreshAttempts
  );

  const refreshProfile = useProfileRefresh(
    user,
    setProfile,
    setIsRefreshingProfile,
    setProfileError
  );

  const handleSessionRefresh = useSessionRefresh(
    refreshAttempts,
    MAX_REFRESH_ATTEMPTS,
    setSession,
    setUser,
    setProfile,
    setProfileError,
    setRefreshAttempts,
    signOut
  );

  // Initialize auth state
  useAuthStateListener(
    setSession,
    setUser,
    setProfile,
    setIsLoading,
    setProfileError,
    setRefreshAttempts,
    user
  );

  // Set up token refresh scheduler
  useTokenRefreshScheduler(session, handleSessionRefresh);

  const value = {
    session,
    user,
    profile,
    isLoading,
    signOut,
    refreshProfile,
    isRefreshingProfile,
    profileError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
