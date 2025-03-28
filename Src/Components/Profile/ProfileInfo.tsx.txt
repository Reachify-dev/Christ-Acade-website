
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";

interface ProfileInfoProps {
  profile: any;
  user: any;
  latestApplication: any;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  profile, 
  user, 
  latestApplication 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const { refreshProfile } = useAuth();

  // Set full name when profile loads
  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const handleNameUpdate = async () => {
    if (!user || !fullName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    try {
      const updateToast = toast.loading('Updating profile...');
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName.trim(), 
          updated_at: new Date().toISOString() 
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      toast.dismiss(updateToast);
      toast.success('Profile name updated successfully');
      setIsEditingName(false);
    } catch (error: any) {
      toast.error('Failed to update profile name');
      console.error('Error updating profile name:', error.message);
    }
  };

  return (
    <div className="space-y-4 flex-1">
      <div>
        <p className="text-sm font-medium text-gray-500">Email</p>
        <p className="text-lg">{profile?.email || user?.email}</p>
      </div>
      
      <div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-500">Name</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditingName(!isEditingName)}
            className="h-8 px-2"
          >
            <PenLine className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        {isEditingName ? (
          <div className="flex gap-2 items-center mt-1">
            <Input 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="flex-1"
            />
            <Button 
              size="sm" 
              onClick={handleNameUpdate}
            >
              Save
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setIsEditingName(false);
                setFullName(profile?.full_name || '');
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <p className="text-lg">{profile?.full_name || 'Not set'}</p>
        )}
      </div>
      
      {latestApplication && latestApplication.status === 'approved' && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-md">
          <p className="font-semibold flex items-center gap-1 text-green-800">
            <CheckCircle className="h-4 w-4" />
            Congratulations!
          </p>
          <p className="text-green-700">
            Your application has been approved. Welcome to our program!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
