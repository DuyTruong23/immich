<script lang="ts">
  import { page } from '$app/state';
  import { focusTrap } from '$lib/actions/focus-trap';
  import { authManager } from '$lib/managers/auth-manager.svelte';
  import AvatarEditModal from '$lib/modals/AvatarEditModal.svelte';
  import { Route } from '$lib/route';
  import { userInteraction } from '$lib/stores/user.svelte';
  import { getAboutInfo, type ServerAboutResponseDto } from '@immich/sdk';
  import { Icon, IconButton, modalManager } from '@immich/ui';
  import { mdiCog, mdiLogout, mdiPencil, mdiWrench } from '@mdi/js';
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import { fade } from 'svelte/transition';
  import UserAvatar from '../UserAvatar.svelte';

  type Props = {
    onClose?: () => void;
  };

  let { onClose }: Props = $props();

  let info: ServerAboutResponseDto | undefined = $state();

  onMount(async () => {
    info = userInteraction.aboutInfo ?? (await getAboutInfo());
  });
</script>

<div
  in:fade={{ duration: 100 }}
  out:fade={{ duration: 80 }}
  id="account-info-panel"
  class="ant-account-panel"
  role="dialog"
  aria-label={$t('account_settings')}
  use:focusTrap
>
  <div class="ant-account-panel__content">
    <section class="ant-account-panel__profile">
      <div class="ant-account-panel__avatar-wrap">
        <UserAvatar user={authManager.user} size="xl" />
        <IconButton
          color="primary"
          icon={mdiPencil}
          aria-label={$t('edit_avatar')}
          size="tiny"
          shape="round"
          class="ant-account-panel__edit-avatar"
          onclick={async () => {
            onClose?.();
            await modalManager.show(AvatarEditModal);
          }}
        />
      </div>

      <div class="ant-account-panel__identity">
        <p class="ant-account-panel__name">{authManager.user.name}</p>
        <p class="ant-account-panel__email">{authManager.user.email}</p>
      </div>
    </section>

    <nav class="ant-account-panel__menu">
      <a href={Route.userSettings()} class="ant-account-panel__menu-item" onclick={onClose}>
        <Icon icon={mdiCog} size="20" aria-hidden />
        <span>{$t('account_settings')}</span>
      </a>

      {#if authManager.user.isAdmin}
        <a
          href={Route.systemSettings()}
          class="ant-account-panel__menu-item"
          aria-current={page.url.pathname.includes('/admin') ? 'page' : undefined}
          onclick={onClose}
        >
          <Icon icon={mdiWrench} size="20" aria-hidden />
          <span>{$t('administration')}</span>
        </a>
      {/if}
    </nav>

    <footer class="ant-account-panel__footer">
      <a href={Route.logout()} class="ant-account-panel__sign-out">
        <Icon icon={mdiLogout} size="20" aria-hidden />
        <span>{$t('sign_out')}</span>
      </a>
    </footer>
  </div>
</div>
