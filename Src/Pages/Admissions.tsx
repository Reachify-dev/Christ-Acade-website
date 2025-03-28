
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth'; // Updated import path
import ApplicationForm from '@/components/application/ApplicationForm';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Admissions = () => {
  const { user, isLoading, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  const [authError, setAuthError] = useState<string | null>(null);

  const openLoginModal = () => {
    setAuthError(null);
    setAuthModalView('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthError(null);
    setAuthModalView('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
    toast.error("Authentication error", {
      description: error
    });
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    // Clear any errors when modal is closed
    setTimeout(() => setAuthError(null), 300);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Admissions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Join Our Community</h2>
            <p>
              Christ Academy Group of Schools offers a nurturing environment where students can 
              grow academically, socially, and personally. Our admission process is designed to 
              be thorough yet welcoming.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Admission Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Completed application form</li>
              <li>Birth certificate</li>
              <li>Previous academic records (if applicable)</li>
              <li>Recent passport photograph</li>
              <li>Immunization records</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6">School Fees</h3>
            <p>
              Our tuition is competitive and provides excellent value for the quality of education 
              offered. Please contact our administrative office for current fee structures for 
              different levels.
            </p>
          </div>
          
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : user ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <p className="font-medium">Logged in as: {user.email}</p>
                  <Button variant="outline" size="sm" onClick={signOut} className="mt-2">
                    Sign Out
                  </Button>
                </div>
                <ApplicationForm />
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center space-y-6">
                <h2 className="text-2xl font-bold">Apply Now</h2>
                <p>
                  Please sign in or create an account to submit your application to Christ Academy Group of Schools.
                </p>
                
                {authError && (
                  <Alert variant="destructive" className="my-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={openLoginModal} className="flex-1">
                    Log In
                  </Button>
                  <Button onClick={openSignupModal} variant="outline" className="flex-1">
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleAuthModalClose} 
        defaultView={authModalView}
        onError={handleAuthError}
      />
    </div>
  );
};

export default Admissions;
