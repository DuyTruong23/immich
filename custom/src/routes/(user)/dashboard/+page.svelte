<script lang="ts">
  import { getAppConfig } from '@photo-gallery/config';
  import { Route } from '$lib/route';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  const { publicEnv } = getAppConfig();
</script>

<svelte:head>
  <title>{publicEnv.appName} — Dashboard</title>
</svelte:head>

<main class="pg-brand-surface mx-auto max-w-5xl p-6 md:p-10">
  <header class="mb-8">
    <p class="text-sm text-(--pg-text-muted)">{publicEnv.companyName || 'Custom frontend'}</p>
    <h1 class="text-3xl font-bold tracking-tight">{publicEnv.appName}</h1>
    <p class="mt-2 text-(--pg-text-muted)">Tổng quan hệ thống — dữ liệu từ Immich API</p>
  </header>

  <section class="grid gap-4 md:grid-cols-3">
    <article class="rounded-xl border border-(--pg-border) p-5">
      <h2 class="text-sm font-medium text-(--pg-text-muted)">Server version</h2>
      <p class="mt-2 text-2xl font-semibold">{data.serverVersion}</p>
    </article>

    <article class="rounded-xl border border-(--pg-border) p-5">
      <h2 class="text-sm font-medium text-(--pg-text-muted)">Albums</h2>
      <p class="mt-2 text-2xl font-semibold">{data.albumCount}</p>
    </article>

    <article class="rounded-xl border border-(--pg-border) p-5">
      <h2 class="text-sm font-medium text-(--pg-text-muted)">Storage (bytes)</h2>
      <p class="mt-2 text-2xl font-semibold">{data.usageBytes.toLocaleString()}</p>
    </article>
  </section>

  <nav class="mt-10 flex flex-wrap gap-3">
    <a class="rounded-lg bg-(--pg-primary) px-4 py-2 text-white hover:bg-(--pg-primary-hover)" href={Route.photos()}>
      Open timeline
    </a>
    <a class="rounded-lg border border-(--pg-border) px-4 py-2" href={Route.albums()}>Albums</a>
    <a class="rounded-lg border border-(--pg-border) px-4 py-2" href={Route.explore()}>Explore</a>
  </nav>
</main>
