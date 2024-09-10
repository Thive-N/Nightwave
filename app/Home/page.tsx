import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
    const session = await auth()
    const user = session?.user
    if (!user) {
        redirect('/auth/login')
    }
    return (
        <div>
            <h1>🫸🏾🔵🔴🫷🏾 🫴🏾 🟣</h1>
            <p>
                Welcome to the home page. Click the icon in the top right to
                sign out
            </p>
        </div>
    )
}
