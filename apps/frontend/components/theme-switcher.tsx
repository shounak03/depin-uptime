// components/ThemeSwitcher.tsx
'use client'

import { icons, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
    {theme === 'light' ? <Button size="icon" onClick={() => setTheme('dark')}><Moon/></Button> 
    : <Button size="icon" onClick={() => setTheme('light')}><Sun/></Button>}
      {/* <Button size="icon" onClick={() => setTheme('light')}><Sun/></Button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button> */}
    </div>
  )
}