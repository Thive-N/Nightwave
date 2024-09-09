import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
export default async function Page() {
    const session = await auth()
    const user = session?.user
    if (!user) {
        redirect('/auth/register')
    }
    return <main>Home page</main>
}
