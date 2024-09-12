import RegisterForm from '@/components/authentication/RegisterForm';
import React from 'react';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';

async function Login() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect('/home');
  }
  return <RegisterForm />;
}

export default Login;
