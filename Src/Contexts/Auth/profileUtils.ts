
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  profile_image: string | null;
}

export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    console.log('Fetching profile for user:', userId);
    
    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (existingProfile) {
      console.log('Profile found:', existingProfile);
      return existingProfile as Profile;
    }
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if profile doesn't exist
      console.error('Error fetching profile:', fetchError);
      throw fetchError;
    }
    
    // Profile doesn't exist, create one
    console.log('Profile not found. Creating profile for user:', userId);
    
    // Get user details from auth
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      console.error('Error getting user data:', userError);
      throw userError || new Error('User not found');
    }
    
    // Create a new profile
    const newProfile = {
      id: userId,
      email: userData.user.email || '',
      full_name: userData.user.user_metadata?.full_name || null,
      role: 'student',
      updated_at: new Date().toISOString()
    };
    
    // Attempt to create profile with exponential backoff retry
    let attempts = 0;
    const maxAttempts = 3;
    const baseDelay = 300; // Start with 300ms delay
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Creating profile attempt ${attempts + 1} for user:`, userId);
        
        const { data: createdProfile, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select('*')
          .single();
          
        if (insertError) {
          console.error(`Error on attempt ${attempts + 1}:`, insertError);
          
          // Check for specific error types and handle accordingly
          if (insertError.code === '23505') {
            // Unique violation - profile might have been created by trigger, try to fetch it
            const { data: retrievedProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .maybeSingle();
              
            if (retrievedProfile) {
              console.log('Profile already exists (created by trigger):', retrievedProfile);
              return retrievedProfile as Profile;
            }
          }
          
          attempts++;
          const delay = baseDelay * Math.pow(2, attempts); // Exponential backoff
          console.log(`Waiting ${delay}ms before retry`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        console.log('Created profile successfully:', createdProfile);
        return createdProfile as Profile;
      } catch (error: any) {
        if (attempts === maxAttempts - 1) {
          console.error('Profile creation failed after maximum attempts:', error);
          throw error;
        }
        attempts++;
        const delay = baseDelay * Math.pow(2, attempts);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Final check in case profile was created by another process
    const { data: finalCheckProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (finalCheckProfile) {
      console.log('Profile found on final check:', finalCheckProfile);
      return finalCheckProfile as Profile;
    }
    
    throw new Error('Failed to create profile after multiple attempts');
  } catch (error: any) {
    console.error('Exception in fetchProfile:', error.message);
    return null;
  }
};

// Function to ensure a profile exists immediately after signup
export const ensureProfileExists = async (user: User): Promise<Profile | null> => {
  try {
    console.log('Ensuring profile exists for user:', user.id);
    
    // First check if profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (existingProfile) {
      console.log('Profile already exists:', existingProfile);
      return existingProfile as Profile;
    }
    
    // Attempt to create a new profile
    const newProfile = {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || null,
      role: 'student',
      updated_at: new Date().toISOString()
    };
    
    console.log('Creating new profile with data:', newProfile);
    
    const { data: createdProfile, error: insertError } = await supabase
      .from('profiles')
      .insert(newProfile)
      .select('*')
      .single();
      
    if (insertError) {
      // If there was a unique violation, the profile might have been created by the trigger
      if (insertError.code === '23505') {
        const { data: retrievedProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (retrievedProfile) {
          console.log('Profile already exists (created by trigger):', retrievedProfile);
          return retrievedProfile as Profile;
        }
      }
      
      console.error('Error creating profile during signup:', insertError);
      throw insertError;
    }
    
    console.log('Created profile during signup:', createdProfile);
    return createdProfile as Profile;
  } catch (error: any) {
    console.error('Failed to ensure profile exists:', error.message);
    // Don't return null - the trigger should create the profile eventually
    // Try to fetch it one more time
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    return data as Profile || null;
  }
};
