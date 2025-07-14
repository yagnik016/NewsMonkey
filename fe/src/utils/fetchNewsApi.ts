const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

export async function fetchNewsApi({ country = "us", category = "general", page = 1, pageSize = 6 } = {}) {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${NEWSAPI_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch from NewsAPI");
  const data = await res.json();
  return data.articles;
} 