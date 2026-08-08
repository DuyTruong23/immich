<script lang="ts">
  import empty1Url from '$lib/assets/empty-1.svg';

  interface Props {
    onClick?: undefined | (() => unknown);
    text: string;
    fullWidth?: boolean;
    src?: string;
    title?: string;
    class?: string;
  }

  let { onClick = undefined, text, fullWidth = false, src = empty1Url, title, class: className }: Props = $props();

  let width = $derived(fullWidth ? 'w-full' : 'w-1/2');

  const hoverClasses = onClick
    ? 'cursor-pointer hover:border-(--colorBrandBackground) hover:bg-(--colorNeutralBackground3)'
    : '';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={onClick ? 'button' : 'div'}
  onclick={onClick}
  class="fluent-empty-state {width} {className} {hoverClasses}"
>
  <div class="fluent-empty-state__icon">
    <img {src} alt="" width="280" draggable="false" class="opacity-90" />
  </div>

  {#if title}
    <h2 class="fluent-subtitle my-3 text-(--fluent-fg-1)">{title}</h2>
  {/if}
  <p class="fluent-caption max-w-sm text-center">{text}</p>
</svelte:element>
