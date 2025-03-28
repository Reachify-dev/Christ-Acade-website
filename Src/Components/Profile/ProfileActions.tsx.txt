
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { toast } from "sonner";

interface ProfileActionsProps {
  onCheckStatus: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading?: boolean;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ 
  onCheckStatus, 
  signOut,
  isLoading = false
}) => {
  const handleCheckStatus = async () => {
    try {
      if (isLoading) return; // Prevent multiple refreshes

      const toastId = toast.loading("Refreshing your data...");
      await onCheckStatus();
      toast.dismiss(toastId);
      toast.success("Data refreshed successfully");
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={handleCheckStatus} 
          className="flex gap-2 items-center"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Check Application Status
        </Button>
        <Button 
          variant="destructive" 
          onClick={signOut}
          disabled={isLoading}
        >
          Sign Out
        </Button>
      </div>
      <CTAButton 
        text="Apply Now" 
        href="/admissions" 
        variant="primary"
      />
    </div>
  );
};

export default ProfileActions;
