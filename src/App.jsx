import React, { useEffect, useState } from "react";
import SeatPicker from "./SeatPicker";
import { supabase } from "./supabaseClient";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sendingLink, setSendingLink] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    setSendingLink(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    setSendingLink(false);

    if (error) {
      alert("Error signing in: " + error.message);
    } else {
      alert("Check your email for the magic link!");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error.message);
    else window.location.reload();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">🎟 Singing in the Smokies</h1>

        <form onSubmit={signIn} className="flex flex-col items-center gap-4 w-full max-w-xs">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            disabled={sendingLink}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            {sendingLink ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">🎟 Singing in the Smokies</h1>
      <p className="mb-4">Logged in as {user.email}</p>
      <button
        onClick={signOut}
        className="bg-red-500 text-white px-4 py-2 mb-6 rounded hover:bg-red-600"
      >
        Sign Out
      </button>

      <SeatPicker />
    </div>
  );
}
