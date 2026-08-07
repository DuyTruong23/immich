import { getAlbumStatistics } from '$custom/api/albums';
import { getServerStatistics, getServerVersion } from '$custom/api/system';
import { enforceFeatureRoute } from '$custom/hooks/feature-guard';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
  await enforceFeatureRoute(url.pathname);

  const [version, albums, stats] = await Promise.all([
    getServerVersion(),
    getAlbumStatistics(),
    getServerStatistics(),
  ]);

  const albumCount = albums.owned + albums.shared + albums.notShared;

  return {
    meta: { title: 'Dashboard' },
    serverVersion: `${version.major}.${version.minor}.${version.patch}`,
    albumCount,
    usageBytes: stats.usage,
  };
}) satisfies PageLoad;
