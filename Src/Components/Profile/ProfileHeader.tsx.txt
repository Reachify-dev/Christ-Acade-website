
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileAvatar from './ProfileAvatar';
import ProfileInfo from './ProfileInfo';
import ProfileActions from './ProfileActions';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ProfileHeaderProps {
  profile: any;
  user: any;
  latestApplication: any;
  onCheckStatus: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading?: boolean;
  profileError?: string | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  user, 
  latestApplication, 
  onCheckStatus, 
  signOut,
  isLoading = false,
  profileError = null
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal account details</CardDescription>
            {profileError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center gap-2 mb-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm font-medium">Profile Error</p>
                </div>
                <p className="text-sm text-red-700 mb-3">{profileError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onCheckStatus} 
                  disabled={isLoading}
                  className="flex items-center gap-1"
                >
                  <RefreshCcw className="h-3 w-3" />
                  <span>Retry Loading Profile</span>
                </Button>
              </div>
            )}
          </div>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {profile?.role || 'Student'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <ProfileAvatar 
            profileImage={profile?.profile_image} 
            fullName={profile?.full_name}
            email={user?.email}
            userId={user?.id}
          />
          
          <ProfileInfo 
            profile={profile} 
            user={user} 
            latestApplication={latestApplication} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <ProfileActions 
          onCheckStatus={onCheckStatus} 
          signOut={signOut}
          isLoading={isLoading} 
        />
      </CardFooter>
    </Card>
  );
};

export default ProfileHeader;
