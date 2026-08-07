import { getAppConfig, isRouteEnabled } from '@photo-gallery/config';
import { goto } from '$app/navigation';

/** Redirect nếu route bị disable bởi feature flag */
export const enforceFeatureRoute = async (pathname: string): Promise<void> => {
  const { features } = getAppConfig();

  if (isRouteEnabled(pathname, features)) {
    return;
  }

  await goto('/photos');
};
