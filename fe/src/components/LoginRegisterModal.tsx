"use client";
import { useState } from "react";
import { useAuthContext } from "@/components/AuthProvider";

export default function LoginRegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, register, loading } = useAuthContext();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(email, password);
        onClose();
      } else {
        await register(email, password, name);
        setMode('login');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-sm relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--primary)]">{mode === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input input-bordered" required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input input-bordered" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered" required />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}</button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <>Do not have an account? <button className="text-[var(--primary)] hover:underline" onClick={() => setMode('register')}>Register</button></>
          ) : (
            <>Already have an account? <button className="text-[var(--primary)] hover:underline" onClick={() => setMode('login')}>Login</button></>
          )}
        </div>
      </div>
    </div>
  );
} 