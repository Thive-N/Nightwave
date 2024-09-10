import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from '@/server/auth';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect('/auth/register');
  }
  return (
    <div className="flex-col">
      <div className="flex h-14 w-full flex-none items-center border-b">
        <h1 className="ml-2 text-xl text-violet-500">Nightwave</h1>
      </div>
      <div className="flex flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={10} className="min-w-[200px] max-w-[300px] !overflow-y-auto">
            <div className="flex h-full items-end justify-center">
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50} className="!overflow-y-auto">
            <div className="h-[calc(100vh-56px)]"></div>
          </ResizablePanel>
          <ResizableHandle withHandle />
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
