"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/components/AuthProvider";

export default function CommentsSection({ slug }: { slug: string }) {
  const { user } = useAuthContext();
  const [comments, setComments] = useState<{ name: string; text: string; date: string }[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setComments(JSON.parse(localStorage.getItem(`comments_${slug}`) || "[]"));
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!user) {
      setError("You must be logged in to comment.");
      return;
    }
    if (!text.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    const newComment = { name: user.name || user.email, text, date: new Date().toISOString() };
    const updated = [...comments, newComment];
    localStorage.setItem(`comments_${slug}`, JSON.stringify(updated));
    setComments(updated);
    setText("");
  };

  return (
    <section className="mt-8">
      <h4 className="text-lg font-bold mb-2 text-[var(--primary)]">Comments</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows={2}
          placeholder={user ? "Add a comment..." : "Login to comment"}
          disabled={!user}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="self-end px-4 py-1 rounded bg-[var(--primary)] text-white font-semibold shadow hover:bg-[var(--primary-hover)] transition"
          disabled={!user || !text.trim()}
        >
          Post
        </button>
      </form>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-gray-500 text-sm">No comments yet.</div>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
              <div className="text-sm font-bold text-[var(--primary)]">{c.name}</div>
              <div className="text-gray-800 dark:text-gray-100 text-base mb-1">{c.text}</div>
              <div className="text-xs text-gray-400">{new Date(c.date).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
} 