import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/server/auth'
export default async function Page() {
    const session = await auth()
    const user = session?.user
    if (!user) {
        redirect('/auth/register')
    }
    return (
        <div>
            <h1>🫸🏾 🔵 🔴 🫷🏾 🫴🏾 🟣</h1>
            <form
                action={async () => {
                    'use server'
                    await signOut()
                }}
            >
                <Button type="submit">Sign Out</Button>
            </form>
        </div>
    )
}
