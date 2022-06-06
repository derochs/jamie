import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Auth from '../components/Auth'
import Dashboard from '../components/Dashboard'
import { Session } from '@supabase/supabase-js'

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Dashboard session={session}/>}
    </div>
  )
}