
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
  signOut: () => Promise<void>;
}

const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage, onRetry, signOut }) => {
  const navigate = useNavigate();
  
  const handleRetry = () => {
    toast.info("Retrying...");
    onRetry();
  };
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <Card className="border-red-200">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 text-center">Profile Error</CardTitle>
          <CardDescription className="text-center text-gray-700 text-base mt-2">
            We encountered a problem while loading your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 p-4 rounded-md border border-red-100 mb-6">
            <p className="text-gray-700">{errorMessage}</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            This could be due to a network issue or a temporary server problem. 
            You can try refreshing your profile or navigating back to the home page.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-4">
          <Button onClick={handleRetry} className="min-w-[120px]" variant="default">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Loading
          </Button>
          <Button variant="outline" onClick={() => navigate('/')} className="min-w-[120px]">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button 
            variant="secondary" 
            onClick={signOut} 
            className="min-w-[120px]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorState;
