import React from 'react';
import { Input } from '@/components/ui/input';
import UserIcon from '@/components/UserIcon';
import { auth } from '@/server/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex h-20 items-center justify-between border-b border-t px-6">
      <ul className="flex w-full items-center justify-between">
        <li className="text-2xl font-bold text-primary/90">Nightwave</li>
        <li></li>
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
