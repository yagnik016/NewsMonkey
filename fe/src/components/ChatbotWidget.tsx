'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hi! I am NewsMonkey Assistant. Ask me anything about news, current affairs, or the site!' },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: 'bot' as const, content: data.reply || 'Sorry, I could not get a response.' }]);
    } catch {
      setMessages((msgs) => [...msgs, { role: 'bot' as const, content: 'Error: Could not connect to Gemini.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center"
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Open Chatbot"
        style={{ boxShadow: '0 8px 32px 0 rgba(80,80,180,0.18)' }}
      >
        <FaComments size={24} />
      </motion.button>
      {/* Modal Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-4 flex flex-col h-[70vh] relative"
              initial={{ y: 80, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 80, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                onClick={() => setOpen(false)}
                aria-label="Close Chatbot"
              >
                <FaTimes size={20} />
              </button>
              <div className="flex-1 overflow-y-auto pr-2 mb-2 mt-6">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div className={`px-4 py-2 rounded-xl max-w-[80%] text-base shadow ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}>{msg.content}</div>
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form
                className="flex gap-2 items-center mt-2"
                onSubmit={e => { e.preventDefault(); sendMessage(); }}
              >
                <input
                  className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Type your question..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform font-semibold flex items-center justify-center"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                >
                  {loading ? <span className="animate-pulse">...</span> : <FaPaperPlane size={18} />}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 