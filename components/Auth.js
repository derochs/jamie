import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogin = async (email) => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email });
            if (error) throw error;
            alert('Check your email for the login link!');
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="px-8 py-4 text-left bg-neutral-800 shadow-md text-zinc-200">
            <h3 className="text-xl font-bold text-center">Login</h3>
            <form>
              <div className="mt-4">
                <label className="block" for="email">
                  Email
                </label>
                <input className="mt-1 w-full text-zinc-200 bg-neutral-800 border border-zinc-200 px-2 py-1 focus:outline-none" id="email" type="text" placeholder="Email"/>
              </div>
              <div className="mt-4">
                <label className="block" for="password">
                  Password
                </label>
                <input className="mt-1 w-full text-zinc-200 bg-neutral-800 border border-zinc-200 px-2 py-1 focus:outline-none" id="password" type="text" placeholder="Password"/>
                <a className="text-sm mt-1 block content-end text-right text-cyan-500" href="">Forgot password?</a>
              </div>
              <div className="mt-4">
                <button className="block bg-transparent hover:bg-cyan-500 hover:border-cyan-500 w-full border rounded-full py-1">
                  Login
                </button>
              </div>
              <div>

              </div>
            </form>
          </div>
        </div>
      </>
  )
}