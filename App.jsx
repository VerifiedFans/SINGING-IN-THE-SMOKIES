import React, { useEffect, useState } from "react";
import SeatPicker from "./SeatPicker";
import { supabase } from "./supabaseClient";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: prompt("Enter your email:"),
    });
    if (error) alert("Error signing in: " + error.message);
    else alert("Check your email for a magic link!");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-xl font-bold mb-4">🎟 Singing in the Smokies</h1>
      
      {!user ? (
        <button onClick={signIn}>Sign In</button>
      ) : (
        <>
          <p>Logged in as {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
          <SeatPicker />
        </>
      )}
    </div>
  );
}
