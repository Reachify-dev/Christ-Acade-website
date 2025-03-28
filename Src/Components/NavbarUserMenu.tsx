
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth'; // Updated import path
import { supabase } from '@/integrations/supabase/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserCog, LogOut, User, ShieldCheck } from 'lucide-react';
import NotificationBell from './NotificationBell';

const NavbarUserMenu = () => {
  const { user, profile, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status
  useEffect(() => {
    if (!user) return;

    const checkAdminStatus = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-is-admin', {
          body: { userId: user.id }
        });

        if (error) throw error;
        setIsAdmin(data?.isAdmin || false);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <NotificationBell />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.profile_image || ''} alt="Profile picture" />
              <AvatarFallback>
                {profile?.full_name 
                  ? profile.full_name.charAt(0).toUpperCase() 
                  : user.email?.charAt(0).toUpperCase() || 'U'
                }
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            {profile?.full_name ? (
              <div>
                <div className="font-medium">{profile.full_name}</div>
                <div className="text-xs text-gray-500">{profile.email}</div>
              </div>
            ) : (
              <div>
                <div className="font-medium">My Account</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/admin" className="flex items-center cursor-pointer">
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem onClick={signOut} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarUserMenu;
