<script lang="ts">
  interface Props {
    code?: number;
  }

  let { code = 505 }: Props = $props();
</script>

<div class="fluent-server-error">
  <svg class="fluent-server-error__scene" viewBox="0 0 800 600" role="img" aria-labelledby="fluent-server-error-title">
    <title id="fluent-server-error-title">Lỗi kết nối server {code}</title>
    <defs>
      <linearGradient id="fluent-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1c1c1e" />
        <stop offset="55%" stop-color="#000000" />
        <stop offset="100%" stop-color="#000000" />
      </linearGradient>
      <linearGradient id="fluent-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2c2c2e" />
        <stop offset="100%" stop-color="#1c1c1e" />
      </linearGradient>
      <linearGradient id="fluent-btn" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#409cff" />
        <stop offset="100%" stop-color="#007aff" />
      </linearGradient>
    </defs>

    <rect width="800" height="600" fill="url(#fluent-sky)" />

    {#each Array(18) as _, i}
      <circle cx={(i * 47 + 20) % 780} cy={(i * 31 + 15) % 260} r="1.5" fill="#fff" opacity="0.55" />
    {/each}

    {#each Array(8) as _, i}
      <g transform="translate({(i * 97 + 40) % 760}, {(i * 53 + 30) % 220})" opacity="0.45">
        <path d="M0 -4 L0 4 M-4 0 L4 0" stroke="#fff" stroke-width="1.2" />
      </g>
    {/each}

    <ellipse cx="120" cy="110" rx="42" ry="42" fill="var(--brand-70, #115ea3)" opacity="0.35" />
    <ellipse cx="680" cy="90" rx="28" ry="28" fill="var(--brand-90, #2886de)" opacity="0.3" />
    <ellipse cx="620" cy="170" rx="18" ry="18" fill="var(--brand-50, #0e4775)" opacity="0.45" />

    <ellipse cx="400" cy="250" rx="320" ry="70" fill="var(--brand-80, #0f6cbd)" opacity="0.22" />
    <ellipse cx="400" cy="235" rx="260" ry="55" fill="var(--brand-100, #479ef5)" opacity="0.18" />

    <text
      x="400"
      y="290"
      text-anchor="middle"
      fill="#fff"
      font-size="132"
      font-weight="700"
      font-family="'Be Vietnam Pro', sans-serif"
      letter-spacing="-4"
    >
      {code}
    </text>

    <ellipse cx="400" cy="330" rx="70" ry="70" fill="var(--brand-20, #082338)" opacity="0.85" />
    <ellipse cx="400" cy="330" rx="70" ry="70" fill="none" stroke="var(--brand-70, #115ea3)" stroke-width="3" opacity="0.6" />
    <path d="M330 330 Q400 300 470 330" fill="none" stroke="var(--brand-100, #479ef5)" stroke-width="2" opacity="0.5" />

    <polygon points="300,360 340,360 320,320" fill="var(--brand-30, #0a2e4a)" />
    <polygon points="470,360 510,360 490,320" fill="var(--brand-30, #0a2e4a)" />

    <g stroke="var(--brand-40, #0c3b5e)" stroke-width="3">
      <line x1="170" y1="360" x2="170" y2="300" />
      <line x1="630" y1="360" x2="630" y2="295" />
      <line x1="720" y1="360" x2="720" y2="305" />
    </g>

    {#each [
      { cx: 170, cy: 285, r: 18, fill: 'var(--brand-110, #62abf5)' },
      { cx: 155, cy: 270, r: 14, fill: 'var(--brand-100, #479ef5)' },
      { cx: 185, cy: 268, r: 12, fill: 'var(--brand-80, #0f6cbd)' },
      { cx: 630, cy: 280, r: 16, fill: 'var(--brand-100, #479ef5)' },
      { cx: 615, cy: 265, r: 13, fill: 'var(--brand-90, #2886de)' },
      { cx: 645, cy: 262, r: 11, fill: 'var(--brand-70, #115ea3)' },
      { cx: 720, cy: 288, r: 15, fill: 'var(--brand-100, #479ef5)' },
      { cx: 705, cy: 273, r: 12, fill: 'var(--brand-90, #2886de)' },
    ] as bubble}
      <circle cx={bubble.cx} cy={bubble.cy} r={bubble.r} fill={bubble.fill} opacity="0.9" />
    {/each}

    <rect x="0" y="380" width="800" height="220" fill="url(#fluent-water)" />

    {#each Array(12) as _, i}
      <rect
        x={(i * 68 + 10) % 760}
        y={410 + ((i * 17) % 80)}
        width={30 + ((i * 13) % 50)}
        height="6"
        rx="3"
        fill="var(--brand-60, #0f548c)"
        opacity="0.35"
      />
    {/each}

    <rect x="220" y="500" width="360" height="44" rx="4" fill="url(#fluent-btn)" />
    <text
      x="400"
      y="528"
      text-anchor="middle"
      fill="#fff"
      font-size="15"
      font-weight="600"
      font-family="'Be Vietnam Pro', sans-serif"
    >
      Liên hệ admin để khởi động server
    </text>
  </svg>
</div>
