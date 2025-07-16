"use client";
import { useState, useRef } from "react";
import { useAuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserPlus } from "react-icons/fa";

function getRandomPosition(cardRef: React.RefObject<HTMLDivElement | null>) {
  if (!cardRef.current) return { top: "auto", left: "auto" };
  const card = cardRef.current;
  const cardRect = card.getBoundingClientRect();
  const btnWidth = 160, btnHeight = 48;
  const maxLeft = cardRect.width - btnWidth - 16;
  const maxTop = cardRect.height - btnHeight - 16;
  return {
    top: Math.random() * maxTop + 8 + "px",
    left: Math.random() * maxLeft + 8 + "px"
  };
}

export default function RegisterPage() {
  const { register, loading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [btnPos, setBtnPos] = useState<{top: string, left: string} | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isValid = email.trim() && password.trim() && name.trim();
  const handleButtonDodge = () => {
    if (!isValid) {
      setBtnPos(getRandomPosition(cardRef));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await register(email, password, name);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div ref={cardRef} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-pink-400 to-blue-500 rounded-full p-3 mb-2 shadow-lg">
            <FaUserPlus className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold mb-1 text-center text-[var(--primary)] tracking-tight">Register</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mb-2" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Registration successful! Redirecting...</div>}
          <div
            style={btnPos ? { position: "absolute", ...btnPos, width: 160, transition: "top 0.3s, left 0.3s" } : {}}
            onMouseEnter={handleButtonDodge}
            onMouseMove={handleButtonDodge}
          >
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={loading}
              style={{ minWidth: 140 }}
            >
              {loading ? "Please wait..." : "Register"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-pink-300 hover:underline font-semibold">Login</Link>
        </div>
      </div>
    </div>
  );
} 