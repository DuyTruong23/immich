<script lang="ts">
  import BrandLogo from '$lib/components/shared-components/BrandLogo.svelte';
  import { Card, CardBody, CardHeader, Heading, VStack } from '@immich/ui';
  import type { Snippet } from 'svelte';

  const icloudPhotosWatermark = '/branding/icloud-photos-watermark.svg';
  interface Props {
    title?: string;
    children?: Snippet;
    withHeader?: boolean;
    withBackdrop?: boolean;
  }

  let { title, children, withHeader = true, withBackdrop = true }: Props = $props();
</script>

<section class="fluent-auth-page relative isolate flex min-h-dvh min-w-dvw items-center justify-center">
  {#if withBackdrop}
    <div class="absolute -z-10 flex size-full place-content-center place-items-center">
      <img
        src={icloudPhotosWatermark}
        class="mx-auto mb-2 h-full max-w-(--breakpoint-md) overflow-hidden antialiased opacity-20"
        alt=""
      />
      <div class="fluent-auth-backdrop absolute inset-s-0 top-0 h-[99%] w-full"></div>
    </div>
  {/if}

  <Card class="fluent-auth-card m-2 w-full max-w-xl">
    {#if withHeader}
      <CardHeader class="mt-6">
        <VStack>
          <BrandLogo variant="icon" size="giant" />
          <Heading size="large" class="fluent-auth-card__title fluent-title" tag="h1">{title}</Heading>
        </VStack>
      </CardHeader>
    {/if}

    <CardBody class="fluent-auth-card__body p-8">
      {@render children?.()}
    </CardBody>
  </Card>
</section>
