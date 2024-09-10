import React from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Socials = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button
        className="w-full"
        variant={'outline'}
        onClick={() => signIn('google', { redirect: true, callbackUrl: '/home' })}
      >
        <div className="flex items-center gap-2">
          <FcGoogle className="h-auto w-5" />
          <p>Sign in with Google</p>
        </div>
      </Button>
      <Button
        className="w-full"
        variant={'outline'}
        onClick={() => signIn('github', { redirect: true, callbackUrl: '/home' })}
      >
        <div className="flex items-center gap-2">
          <FaGithub className="h-auto w-5" />
          <p>Sign in with Github</p>
        </div>
      </Button>
    </div>
  );
};

export default Socials;
