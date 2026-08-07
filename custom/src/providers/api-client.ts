import { setBaseUrl } from '@immich/sdk';

const isCrossOrigin = (serverUrl: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const configured = new URL(serverUrl, window.location.origin);
    return configured.origin !== window.location.origin;
  } catch {
    return false;
  }
};

/** Cấu hình SDK base URL khi frontend và API khác origin (Vercel + VPS) */
export const configureApiClient = (serverUrl: string): void => {
  const trimmed = serverUrl.trim();
  if (!trimmed) {
    return;
  }

  // Vercel proxy: luôn dùng same-origin /api — bỏ qua URL tunnel baked lúc build
  if (isCrossOrigin(trimmed)) {
    return;
  }

  const base = trimmed.replace(/\/$/, '');
  setBaseUrl(`${base}/api`);
};
