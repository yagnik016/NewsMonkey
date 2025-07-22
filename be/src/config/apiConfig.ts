// be/src/config/apiConfig.ts
// Set to 'local' or 'live' to switch environments
export const MODE: 'local' | 'live' = 'local';

const EXTERNAL_API_URLS = {
  local: 'https://cricapi.com/api/', // correct CricAPI endpoint
  live: 'https://cricapi.com/api/',
};

export const EXTERNAL_API_BASE_URL = EXTERNAL_API_URLS[MODE];
// To switch, change MODE above 