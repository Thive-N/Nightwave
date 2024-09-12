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
  console.log(session + '<<<<-----');
  const user = session?.user;
  if (!user) {
    redirect('/register');
  }
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <div className="overflow-auto sm:h-[calc(99vh-80px)]">
            <div className="relative mx-auto flex h-full w-full justify-center overflow-auto overflow-y-auto p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
