<script lang="ts">
  import { getAppConfig } from '@photo-gallery/config';
  import { Route } from '$lib/route';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const { publicEnv } = getAppConfig();

  const storageGb = (data.usageBytes / 1_073_741_824).toFixed(1);
</script>

<svelte:head>
  <title>{publicEnv.appName} — Dashboard</title>
</svelte:head>

<main class="mx-auto max-w-5xl p-6 md:p-10">
  <header class="pg-panel mb-8 p-8">
    <p class="pg-brand-caption">{publicEnv.companyName || 'Fluent 2 Design System'}</p>
    <h1 class="pg-brand-heading mt-2 text-3xl">{publicEnv.appName}</h1>
    <p class="pg-brand-muted mt-2 max-w-2xl">
      Tổng quan thư viện ảnh — đồng bộ trực tiếp với Immich API.
    </p>
  </header>

  <section class="grid gap-4 sm:grid-cols-2 md:grid-cols-3" aria-label="Thống kê hệ thống">
    <article class="pg-card p-5">
      <h2 class="pg-brand-muted font-medium">Phiên bản server</h2>
      <p class="pg-brand-heading mt-2 text-2xl tabular-nums">{data.serverVersion}</p>
      <p class="pg-brand-caption mt-1">Immich backend</p>
    </article>

    <article class="pg-card p-5">
      <h2 class="pg-brand-muted font-medium">Albums</h2>
      <p class="pg-brand-heading mt-2 text-2xl tabular-nums">{data.albumCount}</p>
      <p class="pg-brand-caption mt-1">Tổng số album</p>
    </article>

    <article class="pg-card p-5 sm:col-span-2 md:col-span-1">
      <h2 class="pg-brand-muted font-medium">Dung lượng</h2>
      <p class="pg-brand-heading mt-2 text-2xl tabular-nums">{storageGb} GB</p>
      <p class="pg-brand-caption mt-1">Đã sử dụng trên server</p>
    </article>
  </section>

  <nav class="mt-10 flex flex-wrap gap-2" aria-label="Điều hướng nhanh">
    <a class="pg-btn-primary px-5 py-2.5 text-sm" href={Route.photos()}>Mở timeline</a>
    <a class="pg-btn-secondary px-5 py-2.5 text-sm" href={Route.albums()}>Albums</a>
    <a class="pg-btn-secondary px-5 py-2.5 text-sm" href={Route.explore()}>Explore</a>
  </nav>
</main>
