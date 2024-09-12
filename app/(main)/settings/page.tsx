import React from 'react';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import SettingsCard from './Settings-Card';
async function Settings() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  if (session) {
    return <SettingsCard session={session} />;
  }
}

export default Settings;
