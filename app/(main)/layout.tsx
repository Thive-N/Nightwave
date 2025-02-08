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
      <div className="flex h-full sm:pt-[80px]">
        <Sidebar />
        <div className="h-full w-full overflow-y-auto">
          <div className="py-[80px] sm:h-[calc(99vh-80px)] sm:py-0">
            <div className="relative mx-auto flex h-full w-full justify-center p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
