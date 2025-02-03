'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Session } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import { FaSun } from 'react-icons/fa';
import { FaMoon } from 'react-icons/fa';

const UserIcon = ({ user }: Session) => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image!} alt="@shadcn" />
            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {theme && (
            <DropdownMenuItem className="group" onClick={() => toggleTheme()}>
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <FaMoon
                    size={10}
                    className="transition-all duration-300 ease-in-out group-hover:scale-110"
                  />
                ) : (
                  <FaSun className="transition-all duration-300 ease-in-out group-hover:scale-110" />
                )}
                <p>{theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</p>
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="focus:bg-destructive/80">
            <div className="flex items-center gap-1" onClick={() => signOut()}>
              <FaSignOutAlt />
              Sign out
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default UserIcon;
