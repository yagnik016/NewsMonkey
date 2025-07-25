import type { NextApiRequest, NextApiResponse } from 'next';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDCKg2HZogGlCfXj630FKe0U7Min_Y8kSU';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }
  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });
    const data = await geminiRes.json();
    console.log('Gemini API response:', data);
    if (data.error) {
      console.error('Gemini API error:', data.error);
      return res.status(500).json({ reply: 'Gemini API error: ' + data.error.message });
    }
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not get a response.';
    res.status(200).json({ reply });
  } catch {
    res.status(500).json({ error: 'Failed to connect to Gemini API.' });
  }
} 