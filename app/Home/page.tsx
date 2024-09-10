import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/server/auth'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'

export default async function Page() {
    const session = await auth()
    const user = session?.user
    if (!user) {
        redirect('/auth/register')
    }
    return (
        <div className="flex-col">
            <div className="flex items-center w-full border-b flex-none h-14">
                <h1 className="text-xl ml-2 text-violet-500">Nightwave</h1>
            </div>
            <div className="flex flex-1">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel
                        defaultSize={10}
                        className="max-w-[300px] min-w-[200px] !overflow-y-auto"
                    >
                        <div className="items-end flex h-full justify-center">
                            <form
                                action={async () => {
                                    'use server'
                                    await signOut()
                                }}
                            >
                                <Button type="submit">Sign Out</Button>
                            </form>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle />

                    <ResizablePanel
                        defaultSize={50}
                        className="!overflow-y-auto"
                    >
                        <div className="h-[calc(100vh-56px)]"></div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                </ResizablePanelGroup>
            </div>
        </div>
    )
}
