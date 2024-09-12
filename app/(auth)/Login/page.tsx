import LoginForm from '@/components/authentication/LoginForm';
import React from 'react';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
async function Page() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect('/home');
  }
  return <LoginForm />;
}

export default Page;
