import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Auth from '../components/Auth'
import Dashboard from '../components/Dashboard'
import { Session } from '@supabase/supabase-js'
import Link from 'next/link'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="">
      {!session ? <Link href={{pathname: '/login'}}><a>Login</a></Link> : <Dashboard session={session}/>}
    </div>
  )
}