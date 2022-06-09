import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from 'next/router'

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleLogin = async (e, email, password) => {
      e.preventDefault()
        try {
            const { error } = await supabase.auth.signIn({ email, password });
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
            console.log(error);
        } finally {
        }
    }

    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-neutral-900">
          <div className="px-8 py-4 text-left bg-neutral-800 shadow-md text-zinc-200">
            <h3 className="text-xl font-bold text-center">Login</h3>
            <form>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input className="mt-1 w-full text-zinc-200 bg-neutral-800 border border-zinc-200 px-2 py-1 focus:outline-none" id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <input className="mt-1 w-full text-zinc-200 bg-neutral-800 border border-zinc-200 px-2 py-1 focus:outline-none" id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <a className="text-sm mt-1 block content-end text-right text-cyan-500" href="">Forgot password?</a>
              </div>
              <div className="mt-4">
                <button className="block bg-transparent hover:bg-cyan-500 hover:border-cyan-500 w-full border rounded-full py-1" onClick={(e) => handleLogin(e, email, password)}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
  )
}