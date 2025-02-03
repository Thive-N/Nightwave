import { usePathname } from 'next/navigation';

import { Globe, Compass, Settings, User, Bookmark } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname() || '/';

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'My Feed',
      href: '/home',
      icon: <User size={20} />,
      active: pathname === '/home',
      position: 'top',
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: <Compass size={20} />,
      active: isNavItemActive(pathname, '/explore'),
      position: 'top',
    },
    {
      name: 'Subscriptions',
      href: '/subscriptions',
      icon: <Bookmark size={20} />,
      active: isNavItemActive(pathname, '/following'),
      position: 'top',
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
      active: isNavItemActive(pathname, '/settings'),
      position: 'bottom',
    },
  ];
};
