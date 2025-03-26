
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Activity } from 'lucide-react'
import Link from 'next/link'

import { ThemeSwitcher } from './theme-switcher'

export default function Appbar() {

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 *:sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6" />
            <span className="font-bold">Uptime Monitor</span>
          </Link>
        </div>
        <div className='flex gap-6 '>
            <Link href={"/dashboard"}>Dashboard</Link>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        <ThemeSwitcher/>
        </div>
    </header>
  )
}
