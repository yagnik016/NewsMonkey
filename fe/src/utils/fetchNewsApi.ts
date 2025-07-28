import { API_BASE_URL } from './apiConfig';

export interface NewsApiParams {
  country?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  q?: string;
}

export interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  publishedAt: string;
  urlToImage?: string;
  url?: string;
  externalUrl?: string;
  images?: string[];
  source: string;
  category?: {
    name: string;
    slug: string;
  };
  tags?: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  views?: number;
  likes?: number;
  shares?: number;
}

export async function fetchNewsApi(params: NewsApiParams = {}): Promise<NewsArticle[]> {
  try {
    const { category, page = 1, pageSize = 20, q } = params;
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (pageSize) queryParams.append('limit', pageSize.toString());
    if (category) queryParams.append('category', category);
    if (q) queryParams.append('search', q);

    const url = `${API_BASE_URL}news?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Fetch breaking news
export async function fetchBreakingNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}news?isBreaking=true&limit=5`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
}

// Fetch featured news
export async function fetchFeaturedNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}news?isFeatured=true&limit=6`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }
}

// Search news
export async function searchNews(query: string, params: NewsApiParams = {}): Promise<NewsArticle[]> {
  try {
    const { page = 1, pageSize = 20 } = params;
    
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    queryParams.append('page', page.toString());
    queryParams.append('limit', pageSize.toString());

    const response = await fetch(`${API_BASE_URL}news/search?${queryParams.toString()}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error searching news:', error);
    return [];
  }
} 