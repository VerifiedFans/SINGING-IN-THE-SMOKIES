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
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    else window.location.reload(); // 🔥 reload site after logout to refresh session
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🎟 Singing in the Smokies</h1>

      {!user ? (
        <button 
          onClick={signIn} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      ) : (
        <>
          <p className="mb-4">Logged in as {user.email}</p>

          <button 
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 mb-6 rounded hover:bg-red-600"
          >
            Sign Out
          </button>

          <SeatPicker />
        </>
      )}
    </div>
  );
}
