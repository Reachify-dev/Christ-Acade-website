
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Mail, User, Phone, Calendar, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, any[]>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase.rpc('has_role', {
          role: 'admin'
        });

        if (error) throw error;
        
        if (!data) {
          toast.error('Unauthorized: Admin access required');
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
        fetchMessages();
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast.error('Failed to verify admin permissions');
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (messagesError) throw messagesError;
      setMessages(messagesData || []);
      
      const messageIds = messagesData?.map(m => m.id) || [];
      if (messageIds.length > 0) {
        const { data: repliesData, error: repliesError } = await supabase
          .from('replies')
          .select('*')
          .in('message_id', messageIds)
          .order('created_at', { ascending: true });
        
        if (repliesError) throw repliesError;
        
        const repliesByMessage: Record<string, any[]> = {};
        repliesData?.forEach(reply => {
          if (!repliesByMessage[reply.message_id]) {
            repliesByMessage[reply.message_id] = [];
          }
          repliesByMessage[reply.message_id].push(reply);
        });
        
        setReplies(repliesByMessage);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async (messageId: string) => {
    if (!replyText[messageId]?.trim() || !user?.email) return;
    
    setIsSending(prev => ({ ...prev, [messageId]: true }));
    
    try {
      const message = messages.find(m => m.id === messageId);
      
      const { error: replyError } = await supabase
        .from('replies')
        .insert({
          message_id: messageId,
          admin_email: user.email,
          reply_message: replyText[messageId]
        });
      
      if (replyError) throw replyError;
      
      toast.success('Reply sent successfully');
      
      setReplyText(prev => ({ ...prev, [messageId]: '' }));
      fetchMessages();
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSending(prev => ({ ...prev, [messageId]: false }));
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button onClick={fetchMessages} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="messages">
        <TabsList className="mb-6">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((message) => (
                <Card key={message.id} className="border-l-4 border-l-navy-500">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <CardTitle className="text-xl">{message.subject}</CardTitle>
                        <CardDescription>
                          Received on {new Date(message.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {replies[message.id]?.length || 0} {replies[message.id]?.length === 1 ? 'reply' : 'replies'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-navy-500" />
                        <span className="font-medium">From:</span>
                        <span>{message.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-navy-500" />
                        <span className="font-medium">Email:</span>
                        <span>{message.user_email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-navy-500" />
                          <span className="font-medium">Phone:</span>
                          <span>{message.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-navy-500" />
                        <span className="font-medium">Date:</span>
                        <span>{new Date(message.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <p className="whitespace-pre-wrap">{message.message}</p>
                    </div>
                    
                    {replies[message.id]?.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Replies
                        </h4>
                        <div className="space-y-3">
                          {replies[message.id].map((reply) => (
                            <div key={reply.id} className="bg-navy-50 p-3 rounded-md">
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium">{reply.admin_email}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(reply.created_at).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-sm">{reply.reply_message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Reply</h4>
                      <Textarea
                        value={replyText[message.id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [message.id]: e.target.value }))}
                        placeholder="Type your reply here..."
                        className="mb-2"
                        rows={3}
                      />
                      <Button 
                        onClick={() => handleSendReply(message.id)}
                        disabled={!replyText[message.id]?.trim() || isSending[message.id]}
                        className="flex items-center gap-2"
                      >
                        {isSending[message.id] ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Reply
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-center">No messages received yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Manage your admin preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Admin settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
