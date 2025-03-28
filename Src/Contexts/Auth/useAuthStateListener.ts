
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { fetchProfile, ensureProfileExists, Profile } from './profileUtils';

export function useAuthStateListener(
  setSession: Dispatch<SetStateAction<Session | null>>,
  setUser: Dispatch<SetStateAction<User | null>>,
  setProfile: Dispatch<SetStateAction<Profile | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setProfileError: Dispatch<SetStateAction<string | null>>,
  setRefreshAttempts: Dispatch<SetStateAction<number>>,
  user?: User | null
) {
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        if (mounted) setIsLoading(true);
        
        // Set up auth state change listener first to catch any events during initialization
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log('Auth state changed:', event);
            
            if (!mounted) return;
            
            if (event === 'TOKEN_REFRESHED') {
              console.log('Token was refreshed successfully');
              setRefreshAttempts(0);
            }
            
            setSession(newSession);
            setUser(newSession?.user ?? null);
            
            // Handle specific auth events
            if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
              console.log('User signed in or updated');
              
              if (newSession?.user) {
                // Immediately ensure profile exists for new signups
                if (event === 'SIGNED_IN') {
                  try {
                    console.log('New sign in detected, ensuring profile exists');
                    const profileData = await ensureProfileExists(newSession.user);
                    if (mounted && profileData) {
                      setProfile(profileData);
                      setProfileError(null);
                    } else if (mounted) {
                      setProfileError('Unable to create profile during signup');
                    }
                  } catch (err) {
                    console.error('Error ensuring profile exists:', err);
                  }
                } else {
                  // For other events, just fetch the profile normally
                  try {
                    const profileData = await fetchProfile(newSession.user.id);
                    if (mounted) {
                      if (profileData) {
                        setProfile(profileData);
                        setProfileError(null);
                      } else {
                        setProfileError('Unable to load profile data');
                      }
                    }
                  } catch (err: any) {
                    console.error('Error fetching profile during auth state change:', err);
                    if (mounted) {
                      setProfileError('Failed to load profile: ' + err.message);
                    }
                  }
                }
              } else {
                if (mounted) {
                  setProfile(null);
                  setProfileError(null);
                }
              }
            } else if (event === 'SIGNED_OUT') {
              // Handle sign out
              if (mounted) {
                setProfile(null);
                setProfileError(null);
                toast.info('Signed out successfully');
              }
            } else {
              // For other events, just fetch the profile if user exists
              if (newSession?.user) {
                try {
                  const profileData = await fetchProfile(newSession.user.id);
                  if (mounted) {
                    if (profileData) {
                      setProfile(profileData);
                      setProfileError(null);
                    } else {
                      setProfileError('Unable to load profile data');
                    }
                  }
                } catch (err: any) {
                  console.error('Error fetching profile during auth state change:', err);
                  if (mounted) {
                    setProfileError('Failed to load profile: ' + err.message);
                  }
                }
              }
            }
            
            if (mounted) {
              setIsLoading(false);
            }
            
            // Handle email verification success
            if (event === 'USER_UPDATED' && newSession?.user.email_confirmed_at) {
              const prevConfirmedAt = user?.email_confirmed_at;
              const newConfirmedAt = newSession.user.email_confirmed_at;
              
              // Only show the message if email was just confirmed
              if (!prevConfirmedAt && newConfirmedAt && mounted) {
                toast.success('Email successfully verified!', {
                  description: 'Your account is now fully activated.'
                });
              }
            }
          }
        );

        // Get current session after setting up the listener
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          if (mounted) {
            toast.error('Failed to retrieve your session');
          }
          throw sessionError;
        }
        
        if (mounted) {
          setSession(sessionData.session);
          setUser(sessionData.session?.user ?? null);
        
          // Fetch profile if user is logged in
          if (sessionData.session?.user) {
            try {
              const profileData = await fetchProfile(sessionData.session.user.id);
              if (mounted) {
                if (profileData) {
                  setProfile(profileData);
                  setProfileError(null);
                } else {
                  setProfileError('Unable to load profile data during initialization');
                }
              }
            } catch (err: any) {
              console.error('Error fetching profile during initialization:', err);
              if (mounted) {
                setProfileError('Failed to load profile: ' + err.message);
              }
            }
          }

          setIsLoading(false);
        }
      } catch (error: any) {
        console.error('Error initializing auth:', error.message);
        if (mounted) {
          toast.error('Authentication system initialization failed');
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
    
    return () => {
      mounted = false;
    };
  }, [setSession, setUser, setProfile, setIsLoading, setProfileError, setRefreshAttempts, user]);
}
