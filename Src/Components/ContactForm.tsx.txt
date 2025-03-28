
import { useState } from 'react';
import { User, Mail, MessageSquare, Send, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save message to Supabase
      const { data, error } = await supabase
        .from('messages')
        .insert({
          user_email: formData.email,
          name: formData.name,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        })
        .select('id')
        .single();
        
      if (error) throw error;
      
      // Call the edge function to create notifications for admins
      if (data?.id) {
        await supabase.functions.invoke('create-notification', {
          body: {
            messageId: data.id,
            messageEmail: formData.email,
            messageSubject: formData.subject
          }
        });
      }
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      {submitStatus === 'success' ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-navy-800 mb-2">Message Sent!</h3>
          <p className="text-navy-600 mb-6">
            Thank you for reaching out. We will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-4 py-2 bg-navy-700 text-white rounded-md hover:bg-navy-600 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1">
                Full Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">
                Email Address*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-1">
                Subject*
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
              >
                <option value="">Select a subject</option>
                <option value="Admission Inquiry">Admission Inquiry</option>
                <option value="General Information">General Information</option>
                <option value="Academic Programs">Academic Programs</option>
                <option value="Campus Visit">Campus Visit</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1">
              Message*
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200"
                placeholder="How can we help you?"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-md font-medium text-white ${
                isSubmitting 
                  ? 'bg-navy-400 cursor-not-allowed' 
                  : 'bg-navy-700 hover:bg-navy-600'
              } transition-colors shadow-md`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
