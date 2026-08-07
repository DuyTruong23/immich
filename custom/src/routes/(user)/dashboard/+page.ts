import { enforceAdminRoute } from '$custom/hooks/admin-guard';
import { getAlbumStatistics } from '$custom/api/albums';
import { getServerStatistics, getServerVersion, getStorage, pingServer } from '$custom/api/system';
import { enforceFeatureRoute } from '$custom/hooks/feature-guard';
import type { PageLoad } from './$types';

const formatGiB = (bytes: number): string => `${(bytes / 1024 ** 3).toFixed(1)} GiB`;

export const load = (async ({ url }) => {
  await enforceFeatureRoute(url.pathname);
  await enforceAdminRoute();

  const [version, albums, stats, storage, serverOnline] = await Promise.all([
    getServerVersion(),
    getAlbumStatistics(),
    getServerStatistics(),
    getStorage(),
    pingServer()
      .then(() => true)
      .catch(() => false),
  ]);

  const albumCount = albums.owned + albums.shared + albums.notShared;
  const storageUsed = storage.diskUseRaw;
  const storageTotal = storage.diskSizeRaw;
  const storagePercent = storage.diskUsagePercentage;

  return {
    meta: { title: 'Dashboard' },
    serverVersion: `${version.major}.${version.minor}.${version.patch}`,
    serverOnline,
    albumCount,
    photoCount: stats.photos,
    videoCount: stats.videos,
    mediaUsageBytes: stats.usage,
    storageUsed,
    storageTotal,
    storageUsedLabel: storage.diskUse,
    storageTotalLabel: storage.diskSize,
    storagePercent,
    storageUsedGiB: formatGiB(storageUsed),
    storageTotalGiB: formatGiB(storageTotal),
    mediaUsageGiB: formatGiB(stats.usage),
  };
}) satisfies PageLoad;
