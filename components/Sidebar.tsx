'use client';

import { Fragment, useEffect, useState } from 'react';

import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavItems } from '@/config';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SideNav() {
  const navItems = NavItems();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Default to true for server-side rendering

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('sidebarExpanded');
      if (saved !== null) {
        setIsSidebarExpanded(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarExpanded));
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      <div
        className={cn(
          isSidebarExpanded ? 'w-[200px]' : 'w-[68px]',
          'hidden h-full transform border-r bg-background transition-all duration-300 ease-in-out sm:flex',
        )}
      >
        <aside className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words px-4">
          {/* Top */}
          <div className="relative mt-4 pb-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, idx) => {
                if (item.position === 'top') {
                  return (
                    <Fragment key={idx}>
                      <div>
                        <SideNavItem
                          label={item.name}
                          icon={item.icon}
                          path={item.href}
                          active={item.active}
                          isSidebarExpanded={isSidebarExpanded}
                        />
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
          {/* Bottom */}
          <div className="sticky bottom-0 mb-4 mt-auto block whitespace-nowrap transition duration-200">
            {navItems.map((item, idx) => {
              if (item.position === 'bottom') {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </aside>
        <div className="relative mt-[calc(calc(90vh)-40px)]">
          <button
            type="button"
            className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/20 bg-accent shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} className="stroke-foreground" />
            ) : (
              <ChevronRight size={16} className="stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={`relative flex h-full items-center whitespace-nowrap rounded-md ${
            active
              ? 'font-base bg-primary/70 text-sm text-neutral-700 shadow-sm hover:bg-primary/80 dark:text-white'
              : 'text-neutral-500 hover:bg-neutral-200 hover:bg-secondary/50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          <div className="font-base relative flex flex-row items-center space-x-2 rounded-md px-2 py-2 text-sm duration-100">
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={path}
                className={`relative flex h-full items-center whitespace-nowrap rounded-md duration-300 ease-in-out animate-in ${
                  active
                    ? 'font-base bg-primary/70 text-sm text-neutral-700 hover:bg-neutral-200 hover:bg-primary/80 dark:text-white'
                    : 'text-neutral-500 hover:bg-neutral-200 hover:bg-secondary/50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <div className="font-base relative flex flex-row items-center space-x-2 rounded-md p-2 text-sm duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" className="px-3 py-1.5 text-xs" sideOffset={10}>
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
