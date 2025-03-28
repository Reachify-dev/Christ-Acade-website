
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";

interface ProfileAvatarProps {
  profileImage: string | null;
  fullName: string | null;
  email: string | null;
  userId: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  profileImage, 
  fullName, 
  email, 
  userId 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { refreshProfile } = useAuth();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `profile-image-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    try {
      setIsUploading(true);
      const uploadToast = toast.loading('Uploading profile picture...');
      
      // Check if bucket exists
      const { data: buckets } = await supabase
        .storage
        .listBuckets();
        
      const bucketExists = buckets?.some(bucket => bucket.name === 'profile_pictures');
      
      if (!bucketExists) {
        // Create bucket if it doesn't exist
        const { error: createBucketError } = await supabase
          .storage
          .createBucket('profile_pictures', {
            public: true,
            fileSizeLimit: 5242880 // 5MB
          });
          
        if (createBucketError) throw createBucketError;
      }
      
      // Upload the file
      const { error: uploadError } = await supabase
        .storage
        .from('profile_pictures')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('profile_pictures')
        .getPublicUrl(filePath);
      
      // Update the profile with the new image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          profile_image: publicUrl, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', userId);
        
      if (updateError) throw updateError;
      
      // Refresh the profile to get the updated data
      await refreshProfile();
      
      toast.dismiss(uploadToast);
      toast.success('Profile picture updated successfully');
    } catch (error: any) {
      toast.error('Failed to upload profile picture');
      console.error('Error uploading profile picture:', error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-32 w-32">
        <AvatarImage src={profileImage || ''} alt="Profile picture" />
        <AvatarFallback className="text-2xl">
          {fullName 
            ? fullName.charAt(0).toUpperCase() 
            : email?.charAt(0).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      <label 
        htmlFor="profile-picture" 
        className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer"
      >
        <Upload className="h-4 w-4" />
        <input 
          id="profile-picture" 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>
    </div>
  );
};

export default ProfileAvatar;
