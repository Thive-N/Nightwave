'use client';
import clsx from 'clsx';
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { User, Compass, Bookmark, Settings } from 'lucide-react';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      name: 'My feed',
      href: '/home',
      icon: <User size={25} />,
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: <Compass size={25} />,
    },
    {
      name: 'Subscriptions',
      href: '/subscriptions',
      icon: <Bookmark size={25} />,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={25} />,
    },
  ];

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') setIsOpen(false);
  };

  return (
    <div>
      <div
        className={clsx(
          'fixed right-0 top-0 z-50 h-full w-screen -translate-x-full bg-black/50 font-medium backdrop-blur-sm transition-all md:hidden',
          isOpen && 'translate-x-0',
        )}
        id="wrapper"
        onClick={handleClose}
      >
        <section className="text-primary/5m absolute left-0 top-0 z-50 flex h-screen w-56 flex-col gap-8 bg-[#080c17cb] p-8 text-lg">
          <X
            onClick={() => setIsOpen(false)}
            className="mb-8 mt-0 cursor-pointer text-xl transition-transform duration-300 hover:rotate-90 hover:text-purple-500"
            size={30}
          />
          {navItems.map((item) => (
            <Link
              className="flex w-full items-center gap-3 py-2 hover:text-purple-500"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </section>
      </div>
      <MenuIcon
        className="cursor-pointer hover:text-purple-500 sm:hidden"
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
};

export default MobileSidebar;
