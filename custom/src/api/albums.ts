export {
  getAllAlbums,
  createAlbum,
  getAlbumInfo,
  updateAlbumInfo,
  deleteAlbum,
  addAssetsToAlbum,
  removeAssetFromAlbum,
  addAssetsToAlbums,
  getAlbumStatistics,
  getAlbumMapMarkers,
  addUsersToAlbum,
  removeUserFromAlbum,
  updateAlbumUser,
} from '@immich/sdk';

export type { AlbumResponseDto, CreateAlbumDto, UpdateAlbumDto } from '@immich/sdk';
