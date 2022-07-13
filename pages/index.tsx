import type { NextPage } from 'next'
import { useEffect, useState } from "react";
import Login from "../components/Login";
import Payment from "../components/Payment";
import Profile from "../components/Profile";
import { supabase } from "../lib/initSupabase";

const Home: NextPage = () => {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    // setting in session
    setSession(supabase.auth.session());

    // when the user logs in / out, update the session
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      {!session ? <Login /> : <Profile session={session} />}
      <div className="flex flex-wrap justify-center space-x-6">
        <Payment />
        <Payment />
        <Payment />
      </div>
    </main>
  );
};

export default Home
