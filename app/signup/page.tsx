"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
        organization_name: orgName,
        industry
      })
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({} as { error?: string }));
      setError(payload.error || 'Signup failed');
      return;
    }

    router.replace('/login');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="card w-full max-w-5xl">
        <div className="grid gap-8 p-8 md:grid-cols-[1fr_1fr] md:gap-12">
          <div className="space-y-4">
            <p className="pill">Create workspace</p>
            <h1 className="text-3xl font-bold text-slate-900">Spin up your PLM tenant</h1>
            <p className="text-sm text-slate-600">
              We will create a new organization, set you as admin, and seed demo data (products, projects, BOMs, CAD, suppliers) so your dashboard looks production-ready on first login.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />Multi-tenant isolation with Supabase Auth</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />Document and CAD storage using Supabase buckets</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />Role-based access: admin, product, engineering, quality, procurement</li>
            </ul>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Organization name</label>
              <input placeholder="NovaTech Manufacturing Group" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Industry (optional)</label>
              <input placeholder="Medical devices, industrial automation" value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full name</label>
              <input placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" type="submit">
              Create Workspace
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
