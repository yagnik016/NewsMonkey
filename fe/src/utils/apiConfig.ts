// fe/src/utils/apiConfig.ts
// Set to 'local' or 'live' to switch environments
const MODE: 'local' | 'live' = 'live';

const URLS = {
  local: 'http://localhost:3005/api/v1/', // local backend API with prefix
  live: 'https://newsmonkey-be.vercel.app/', // live backend API
};

export const API_BASE_URL = URLS[MODE];
// To switch, change MODE above 