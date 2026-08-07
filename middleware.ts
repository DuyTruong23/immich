const DEFAULT_UPSTREAM = 'https://immich.gallery-app.pp.ua';

export const config = {
  matcher: ['/api/:path*'],
};

/** Chạy trước static/rewrites — proxy /api → Immich tunnel */
export default async function middleware(request: Request): Promise<Response> {
  const upstreamBase = (process.env.IMMICH_SERVER_URL ?? DEFAULT_UPSTREAM).replace(/\/$/, '');
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
