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
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full overflow-x-auto">
          <div className="overflow-auto sm:h-[calc(99vh-80px)]">
            <div className="h-[calc(100vh - 120px)] relative mx-auto flex w-full justify-center overflow-auto overflow-y-auto">
              <div className="w-full md:max-w-6xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
