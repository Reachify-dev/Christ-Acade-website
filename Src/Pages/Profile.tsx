
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/auth"; 
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserNotifications from "@/components/UserNotifications";
import ProfileHeader from '@/components/profile/ProfileHeader';
import ApplicationsList from '@/components/profile/ApplicationsList';
import ErrorState from '@/components/profile/ErrorState';
import LoadingState from '@/components/profile/LoadingState';

const Profile = () => {
  const { user, profile, signOut, refreshProfile, isLoading: authLoading, profileError } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPageMounted, setIsPageMounted] = useState(true);
  
  // Set mounted state
  useEffect(() => {
    setIsPageMounted(true);
    return () => setIsPageMounted(false);
  }, []);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/');
      toast.error('Please log in to view your profile');
    }
  }, [user, navigate, authLoading]);

  // Check if user is admin
  useEffect(() => {
    if (!user || !isPageMounted) return;

    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-is-admin', {
          body: { userId: user.id }
        });

        if (error) throw error;
        if (isPageMounted) {
          setIsAdmin(data?.isAdmin || false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [user, isPageMounted]);

  // Fetch user's applications
  const fetchData = useCallback(async () => {
    if (!user || !isPageMounted) return;
    
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      // Fetch applications
      const { data: appData, error: appError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (appError) {
        console.error('Error fetching applications:', appError);
        if (isPageMounted) {
          setErrorMessage('Failed to fetch application data.');
        }
      } else if (isPageMounted) {
        setApplications(appData || []);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      if (isPageMounted) {
        setErrorMessage('Failed to fetch data. Please try refreshing the page.');
      }
    } finally {
      if (isPageMounted) {
        setIsLoading(false);
      }
    }
  }, [user, isPageMounted]);

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [fetchData, user, profile]);

  const handleCheckStatus = async () => {
    if (!user || !isPageMounted) return;
    
    try {
      setIsRefreshing(true);
      const toastId = toast.loading("Refreshing your data...");
      
      // Refresh profile
      await refreshProfile();
      
      // Fetch applications
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      toast.dismiss(toastId);
      
      if (error) {
        toast.error("Failed to refresh application data");
        throw error;
      }
      
      if (isPageMounted) {
        setApplications(data || []);
        toast.success("Data refreshed successfully");
      }
    } catch (error: any) {
      console.error('Error refreshing data:', error.message);
      if (isPageMounted) {
        setErrorMessage('Failed to refresh data. Please try again.');
      }
    } finally {
      if (isPageMounted) {
        setIsRefreshing(false);
      }
    }
  };

  // If auth is still loading, show loading state
  if (authLoading) {
    return <LoadingState message="Loading your account information..." />;
  }

  // If no user, don't render further (the redirect effect will handle navigation)
  if (!user) {
    return null;
  }

  // If there's a profile error, show it
  if (profileError) {
    return <ErrorState 
      errorMessage={profileError} 
      onRetry={refreshProfile} 
      signOut={signOut} 
    />;
  }

  // If there's a general error and no profile, show error state
  if (errorMessage && !profile) {
    return <ErrorState 
      errorMessage={errorMessage} 
      onRetry={handleCheckStatus} 
      signOut={signOut} 
    />;
  }

  // If we have a user but no profile, show a friendly error
  if (!profile && !isLoading && !authLoading) {
    return <ErrorState 
      errorMessage="Unable to load your profile information. Please try again." 
      onRetry={refreshProfile} 
      signOut={signOut} 
    />;
  }

  // If still loading, show loading state
  if ((isLoading || !profile) && !errorMessage) {
    return <LoadingState />;
  }

  // Get the latest application
  const latestApplication = applications[0];

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">Your Profile</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="admin" onClick={() => navigate('/admin')}>
              Admin Dashboard
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="profile">
          {profile && (
            <ProfileHeader 
              profile={profile} 
              user={user} 
              latestApplication={latestApplication}
              onCheckStatus={handleCheckStatus}
              signOut={signOut}
              isLoading={isRefreshing}
            />
          )}
        </TabsContent>
        
        <TabsContent value="applications">
          <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
          <ApplicationsList 
            applications={applications} 
            isLoading={isRefreshing} 
          />
        </TabsContent>
        
        <TabsContent value="notifications">
          <UserNotifications />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
