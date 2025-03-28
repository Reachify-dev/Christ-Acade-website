
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import CTAButton from "@/components/CTAButton";

interface ApplicationsListProps {
  applications: any[];
  isLoading: boolean;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications, isLoading }) => {
  // Helper function to render status badge with appropriate styling
  const renderStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex gap-1 items-center">
            <CheckCircle className="h-3.5 w-3.5" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex gap-1 items-center">
            <XCircle className="h-3.5 w-3.5" />
            Rejected
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 flex gap-1 items-center">
            <Clock className="h-3.5 w-3.5" />
            Pending
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500 mb-4">You haven't submitted any applications yet.</p>
          <CTAButton 
            text="Apply Now" 
            href="/admissions" 
            variant="primary"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{app.program} Program</CardTitle>
                <CardDescription>Submitted on {new Date(app.created_at).toLocaleDateString()}</CardDescription>
              </div>
              {renderStatusBadge(app.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{app.full_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{app.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p>{app.phone || 'Not provided'}</p>
              </div>
            </div>
            {app.message && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Additional Information</p>
                <p className="mt-1">{app.message}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationsList;
