
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading your profile data..." 
}) => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <Card className="p-8">
        <div className="flex flex-col space-y-6">
          {/* Profile header skeleton */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          
          {/* Profile details skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
          
          {/* Loading message */}
          <div className="flex flex-col items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-2"></div>
            <p className="text-gray-500 text-center">{message}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoadingState;
