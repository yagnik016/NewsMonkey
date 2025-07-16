import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';

const API_URL = process.env.LIVE_API_BASEURL || 'https://newsmonkey-be.vercel.app/';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const { token } = await res.json();
    // Fetch user profile
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.sub;
    const userRes = await fetch(`${API_URL}/users/${userId}`);
    const userData = await userRes.json();
    const userObj = { ...userData, token };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    setLoading(false);
    return userObj;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) throw new Error('Registration failed');
    setLoading(false);
    return res.json();
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return { user, loading, login, register, logout };
} 