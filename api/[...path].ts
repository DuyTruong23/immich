export const config = {
  runtime: 'edge',
};

const DEFAULT_UPSTREAM = 'https://immich.gallery-app.pp.ua';

const getUpstreamBase = (): string => {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return (env?.IMMICH_SERVER_URL ?? DEFAULT_UPSTREAM).replace(/\/$/, '');
};

/** Proxy /api/* → Immich tunnel (same-origin, tránh CORS) */
export default async function handler(request: Request): Promise<Response> {
  const upstreamBase = getUpstreamBase();
  const url = new URL(request.url);
  const targetUrl = `${upstreamBase}${url.pathname}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const init: RequestInit & { duplex?: 'half' } = {
    method: request.method,
    headers,
    redirect: 'manual',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
    init.duplex = 'half';
  }

  return fetch(targetUrl, init);
}
