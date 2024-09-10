import React from 'react'
import { Input } from '@/components/ui/input'
import UserIcon from '@/components/UserIcon'
import { auth } from '@/server/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default async function Navbar() {
    const session = await auth()

    return (
        <nav className="py-6 border-t border-b px-6">
            <ul className="flex items-center justify-between w-full">
                <li className="font-bold text-2xl text-primary/90">
                    Nightwave
                </li>
                <li></li>
                {!session ? (
                    <li>
                        <Button>
                            <Link href="/auth/login">
                                <span>Login</span>
                            </Link>
                        </Button>
                    </li>
                ) : (
                    <li>
                        <UserIcon
                            user={session?.user}
                            expires={session?.expires!}
                        />
                    </li>
                )}
            </ul>
        </nav>
    )
}
