import React, { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import UserIcon from '@/components/UserIcon';
import MobileSidebar from './MobileSidebar';
import { auth } from '@/server/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full flex-row items-center justify-between border-b bg-background px-6 sm:z-0">
      <ul className="flex w-full items-center justify-between">
        <li className="flex items-center gap-4 text-2xl font-bold text-primary/90 lg:text-3xl">
          <MobileSidebar />
          <Link href="/home">Nightwave</Link>
        </li>

        {!session ? (
          <li>
            <Button>
              <Link href="/login">
                <span>Login</span>
              </Link>
            </Button>
          </li>
        ) : (
          <li>
            <UserIcon user={session?.user} expires={session?.expires!} />
          </li>
        )}
      </ul>
    </nav>
  );
}
