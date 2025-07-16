"use client";
import { useState, useRef } from "react";
import { useAuthContext } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

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

export default function LoginPage() {
  const { login, loading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [btnPos, setBtnPos] = useState<{top: string, left: string} | null>(null);
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const isValid = email.trim() && password.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValid) {
      setBtnPos(getRandomPosition(cardRef));
      return;
    }
    setBtnPos(null);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleButtonDodge = () => {
    if (!isValid) {
      setBtnPos(getRandomPosition(cardRef));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div ref={cardRef} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-pink-400 rounded-full p-3 mb-2 shadow-lg">
            <FaUserCircle className="text-white text-4xl" />
          </div>
          <h2 className="text-3xl font-extrabold mb-1 text-center text-[var(--primary)] tracking-tight">Login</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mb-2" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div
            style={btnPos ? { position: "absolute", ...btnPos, width: 160, transition: "top 0.3s, left 0.3s" } : {}}
            onMouseEnter={handleButtonDodge}
            onMouseMove={handleButtonDodge}
          >
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
              style={{ minWidth: 140 }}
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 dark:text-pink-300 hover:underline font-semibold">Register</Link>
        </div>
      </div>
    </div>
  );
} 