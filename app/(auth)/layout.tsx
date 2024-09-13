import Navbar from '@/components/Navbar';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect('/home');
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
