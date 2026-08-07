import { getAppConfig, isRouteEnabled } from '@photo-gallery/config';
import { goto } from '$app/navigation';
import { authManager } from '$lib/managers/auth-manager.svelte';

/** Redirect nếu route bị disable bởi feature flag (admin bypass) */
export const enforceFeatureRoute = async (pathname: string): Promise<void> => {
  if (authManager.authenticated && authManager.user.isAdmin) {
    return;
  }

  const { features } = getAppConfig();

  if (isRouteEnabled(pathname, features)) {
    return;
  }

  await goto('/photos');
};
