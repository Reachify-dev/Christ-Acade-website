
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  program: z.string().min(1, 'Please select a program'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, refreshProfile } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: user?.email || '',
      phone: '',
      program: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error('You must be logged in to submit an application');
      return;
    }

    setIsLoading(true);
    try {
      const submissionToast = toast.loading('Submitting your application...');
      
      const { data, error } = await supabase.from('applications').insert({
        user_id: user.id,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone || null,
        program: values.program,
        message: values.message || null,
        status: 'pending'
      }).select();

      if (error) {
        throw error;
      }
      
      // Refresh profile to get updated applications
      await refreshProfile();
      
      toast.dismiss(submissionToast);
      toast.success('Application submitted successfully! We will get in touch soon.');
      setIsSubmitted(true);
      form.reset();
    } catch (error: any) {
      console.error('Application submission error:', error);
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle>Thank you for applying!</AlertTitle>
          <AlertDescription>
            Application submitted successfully! We will review your application and get in touch soon. You can check the status of your application in your profile page.
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
            className="mr-2"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+234..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kindergarten">Kindergarten</SelectItem>
                    <SelectItem value="elementary">Elementary School</SelectItem>
                    <SelectItem value="junior">Junior High School</SelectItem>
                    <SelectItem value="senior">Senior High School</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us more about yourself or ask any questions..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
