"use client";
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="login-form-input"
      />
      <div className="login-form-password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="login-form-input"
        />
        <button
          type="button"
          className="login-form-eye-btn"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            // Eye open SVG
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
          ) : (
            // Eye closed SVG
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.97 10.97 0 0112 19.5c-6.5 0-10.5-7.5-10.5-7.5a21.77 21.77 0 014.21-5.94M9.88 9.88A3 3 0 0112 9c1.66 0 3 1.34 3 3 0 .39-.08.76-.21 1.09M6.1 6.1l11.8 11.8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" /></svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="login-form-button"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && (
        <div className="login-form-error">
          {error}
        </div>
      )}
    </form>
  );
}