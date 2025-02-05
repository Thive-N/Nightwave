import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/register');
  }
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <div className="flex h-full pt-20 sm:pt-0">
        <Sidebar />
        <div className="h-full w-full overflow-y-auto sm:mt-0">
          <div className="sm:h-[calc(99vh-80px)]">
            <div className="relative mx-auto flex h-full w-full justify-center p-4 sm:pt-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
