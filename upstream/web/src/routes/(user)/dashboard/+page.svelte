<script lang="ts">
  import { getAppConfig } from '@photo-gallery/config';
  import UserPageLayout from '$lib/components/layouts/UserPageLayout.svelte';
  import { Route } from '$lib/route';
  import {
    mdiAccountMultipleOutline,
    mdiCheckCircle,
    mdiHeartOutline,
    mdiImageAlbum,
    mdiImageMultipleOutline,
    mdiServerOff,
    mdiVideoOutline,
  } from '@mdi/js';
  import { Icon } from '@immich/ui';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const { publicEnv } = getAppConfig();

  const statCards = $derived([
    { label: 'Ảnh', value: data.photoCount.toLocaleString('vi-VN'), icon: mdiImageMultipleOutline, tone: 'brand' },
    { label: 'Video', value: data.videoCount.toLocaleString('vi-VN'), icon: mdiVideoOutline, tone: 'info' },
    { label: 'Albums', value: data.albumCount.toLocaleString('vi-VN'), icon: mdiImageAlbum, tone: 'warning' },
    { label: 'Phiên bản', value: `v${data.serverVersion}`, icon: mdiCheckCircle, tone: 'success' },
  ]);

  const quickLinks = [
    { label: 'Timeline', href: Route.photos(), icon: mdiImageMultipleOutline, primary: true },
    { label: 'Albums', href: Route.albums(), icon: mdiImageAlbum },
    { label: 'Yêu thích', href: Route.favorites(), icon: mdiHeartOutline },
    { label: 'Chia sẻ', href: Route.sharing(), icon: mdiAccountMultipleOutline },
  ];

  const toneClass: Record<string, string> = {
    brand: 'fluent-badge--brand',
    info: 'fluent-badge--brand',
    warning: 'fluent-badge--warning',
    success: 'fluent-badge--success',
  };
</script>

<UserPageLayout title={data.meta.title} description={publicEnv.companyName || 'Quản trị hệ thống'}>
  {#snippet buttons()}
    <div
      class="fluent-badge {data.serverOnline ? 'fluent-badge--success' : 'fluent-badge--danger'}"
    >
      <Icon icon={data.serverOnline ? mdiCheckCircle : mdiServerOff} size="16" />
      {data.serverOnline ? 'Server online' : 'Server offline'}
    </div>
  {/snippet}

  <div class="mx-auto max-w-6xl px-2 pb-8 md:px-4">
    <p class="mb-6 text-sm text-(--fluent-fg-3)">Tổng quan thư viện — chỉ dành cho admin</p>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {#each statCards as card (card.label)}
        <article class="fluent-card">
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2 class="text-sm font-medium text-(--fluent-fg-3)">{card.label}</h2>
            <span class="fluent-badge {toneClass[card.tone]}">
              <Icon icon={card.icon} size="20" />
            </span>
          </div>
          <p class="text-3xl font-semibold tracking-tight text-(--fluent-fg-1)">{card.value}</p>
        </article>
      {/each}
    </section>

    <section class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <article class="fluent-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-(--fluent-fg-1)">Dung lượng lưu trữ</h2>
            <p class="mt-1 text-sm text-(--fluent-fg-3)">
              {data.storageUsedLabel} / {data.storageTotalLabel}
              ({data.storagePercent}%)
            </p>
          </div>
          <p class="text-sm text-(--fluent-fg-3)">Media: {data.mediaUsageGiB}</p>
        </div>

        <div class="h-2 overflow-hidden rounded-full bg-(--fluent-stroke-1)">
          <div
            class="h-full rounded-full transition-all duration-200 {data.storagePercent >= 95
              ? 'bg-(--fluent-danger)'
              : data.storagePercent >= 80
                ? 'bg-(--fluent-warning)'
                : 'bg-(--fluent-brand)'}"
            style="width: {Math.min(data.storagePercent, 100)}%"
          ></div>
        </div>

        <div class="mt-3 flex justify-between text-xs text-(--fluent-fg-3)">
          <span>{data.storageUsedGiB} đã dùng</span>
          <span>{data.storageTotalGiB} tổng</span>
        </div>
      </article>

      <article class="fluent-card">
        <h2 class="text-lg font-semibold text-(--fluent-fg-1)">Truy cập nhanh</h2>
        <p class="mt-1 mb-4 text-sm text-(--fluent-fg-3)">Đi tới các khu vực chính của thư viện</p>

        <nav class="grid gap-2">
          {#each quickLinks as link (link.href)}
            <a
              class="fluent-control flex items-center gap-3 px-4 py-3 {link.primary
                ? 'fluent-control--primary'
                : 'fluent-control--secondary'}"
              href={link.href}
            >
              <Icon icon={link.icon} size="20" />
              {link.label}
            </a>
          {/each}
        </nav>
      </article>
    </section>
  </div>
</UserPageLayout>
