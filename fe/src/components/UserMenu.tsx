"use client";
import { useAuthContext } from "@/components/AuthProvider";
import Link from "next/link";

export default function UserMenu() {
  const { user, logout } = useAuthContext();
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[var(--primary)]">{user.name}</span>
        <a href="/bookmarks" className="btn btn-sm btn-outline">Bookmarks</a>
        <button className="btn btn-sm btn-outline" onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a href="/bookmarks" className="btn btn-sm btn-outline">Bookmarks</a>
      <Link href="/login" className="btn btn-sm btn-primary">Login</Link>
      <Link href="/register" className="btn btn-sm btn-outline">Register</Link>
    </div>
  );
} 