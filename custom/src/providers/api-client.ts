import { setBaseUrl } from '@immich/sdk';

/** Cấu hình SDK base URL khi frontend và API khác origin (Vercel + VPS) */
export const configureApiClient = (serverUrl: string): void => {
  const trimmed = serverUrl.trim();
  if (!trimmed) {
    return;
  }

  const base = trimmed.replace(/\/$/, '');
  setBaseUrl(`${base}/api`);
};
