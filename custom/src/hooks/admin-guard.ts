import { goto } from '$app/navigation';
import { authManager } from '$lib/managers/auth-manager.svelte';

/** Redirect non-admin users away from admin-only routes */
export const enforceAdminRoute = async (): Promise<void> => {
  if (authManager.user.isAdmin) {
    return;
  }

  await goto('/photos');
};
