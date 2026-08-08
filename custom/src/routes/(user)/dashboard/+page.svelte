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
    { label: 'Ảnh', value: data.photoCount.toLocaleString('vi-VN'), icon: mdiImageMultipleOutline, tone: 'sky' },
    { label: 'Video', value: data.videoCount.toLocaleString('vi-VN'), icon: mdiVideoOutline, tone: 'violet' },
    { label: 'Albums', value: data.albumCount.toLocaleString('vi-VN'), icon: mdiImageAlbum, tone: 'amber' },
    { label: 'Phiên bản', value: `v${data.serverVersion}`, icon: mdiCheckCircle, tone: 'emerald' },
  ]);

  const quickLinks = [
    { label: 'Timeline', href: Route.photos(), icon: mdiImageMultipleOutline, primary: true },
    { label: 'Albums', href: Route.albums(), icon: mdiImageAlbum },
    { label: 'Yêu thích', href: Route.favorites(), icon: mdiHeartOutline },
    { label: 'Chia sẻ', href: Route.sharing(), icon: mdiAccountMultipleOutline },
  ];

  const toneClass: Record<string, string> = {
    sky: 'bg-sky-500/10 text-sky-400',
    violet: 'bg-violet-500/10 text-violet-400',
    amber: 'bg-amber-500/10 text-amber-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
  };
</script>

<UserPageLayout title={data.meta.title} description={publicEnv.companyName || 'Quản trị hệ thống'}>
  {#snippet buttons()}
    <div
      class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm {data.serverOnline
        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
        : 'border-red-500/30 bg-red-500/10 text-red-400'}"
    >
      <Icon icon={data.serverOnline ? mdiCheckCircle : mdiServerOff} size="16" />
      {data.serverOnline ? 'Server online' : 'Server offline'}
    </div>
  {/snippet}

  <div class="mx-auto max-w-6xl px-2 pb-8 md:px-4">
    <p class="mb-6 text-sm text-(--pg-text-muted)">Tổng quan thư viện — chỉ dành cho admin</p>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {#each statCards as card (card.label)}
        <article class="rounded-2xl border border-(--pg-border) bg-(--pg-surface-raised, transparent) p-5">
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2 class="text-sm font-medium text-(--pg-text-muted)">{card.label}</h2>
            <span class="inline-flex rounded-lg p-2 {toneClass[card.tone]}">
              <Icon icon={card.icon} size="20" />
            </span>
          </div>
          <p class="text-3xl font-semibold tracking-tight">{card.value}</p>
        </article>
      {/each}
    </section>

    <section class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <article class="rounded-2xl border border-(--pg-border) p-6">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold">Dung lượng lưu trữ</h2>
            <p class="mt-1 text-sm text-(--pg-text-muted)">
              {data.storageUsedLabel} / {data.storageTotalLabel}
              ({data.storagePercent}%)
            </p>
          </div>
          <p class="text-sm text-(--pg-text-muted)">Media: {data.mediaUsageGiB}</p>
        </div>

        <div class="h-3 overflow-hidden rounded-full bg-(--pg-border)">
          <div
            class="h-full rounded-full transition-all {data.storagePercent >= 95
              ? 'bg-red-500'
              : data.storagePercent >= 80
                ? 'bg-amber-500'
                : 'bg-(--pg-primary)'}"
            style="width: {Math.min(data.storagePercent, 100)}%"
          ></div>
        </div>

        <div class="mt-3 flex justify-between text-xs text-(--pg-text-muted)">
          <span>{data.storageUsedGiB} đã dùng</span>
          <span>{data.storageTotalGiB} tổng</span>
        </div>
      </article>

      <article class="rounded-2xl border border-(--pg-border) p-6">
        <h2 class="text-lg font-semibold">Truy cập nhanh</h2>
        <p class="mt-1 mb-4 text-sm text-(--pg-text-muted)">Đi tới các khu vực chính của thư viện</p>

        <nav class="grid gap-2">
          {#each quickLinks as link (link.href)}
            <a
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors {link.primary
                ? 'bg-(--pg-primary) text-white hover:bg-(--pg-primary-hover)'
                : 'border border-(--pg-border) hover:bg-(--pg-border)/40'}"
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
