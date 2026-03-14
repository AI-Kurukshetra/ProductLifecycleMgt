"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

async function login(email: string, password: string) {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setError(payload.error || 'Login failed. Please verify your email and password.');
        return;
      }
      router.replace('/dashboard');
    } catch (err) {
      setError('Unable to reach server. Check your connection and try again.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="card w-full max-w-xl">
        <div className="grid gap-6 p-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div>
            <p className="pill">Welcome back</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Sign in to your PLM workspace</h1>
            <p className="mt-3 text-sm text-slate-600">
              Access product data, engineering change workflows, controlled documents, and BOM control in one SaaS platform.
            </p>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
