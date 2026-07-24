"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const result = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) setError(result.error.message);
    else {
      router.push("/dashboard");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <h2>{isSignUp ? "Create your account" : "Welcome back"}</h2>
        <p>{isSignUp ? "Start building a clearer fuel history." : "Sign in to continue your journey."}</p>
      </div>
      <label>
        <span>Email</span>
        <div><Mail size={18} /><input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
      </label>
      <label>
        <span>Password</span>
        <div><LockKeyhole size={18} /><input type="password" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} /></div>
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={loading} className="button button-primary button-wide">
        {loading ? "Please wait…" : isSignUp ? "Create account" : "Sign in"} <ArrowRight size={18} />
      </button>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="login-switch">
        {isSignUp ? "Already have an account? Sign in" : "New to FuelGuide? Create an account"}
      </button>
    </form>
  );
}
