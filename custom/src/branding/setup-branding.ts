import { logoManager } from '@immich/ui';

const icon = '/branding/icloud-photos-icon.svg';
const inlineLight = '/branding/icloud-photos-inline-light.svg';
const inlineDark = '/branding/icloud-photos-inline-dark.svg';

logoManager.setLogo({
  stacked: {
    light: inlineLight,
    dark: inlineDark,
  },
  unstacked: {
    light: inlineLight,
    dark: inlineDark,
  },
  stacked_futo: {
    light: inlineLight,
    dark: inlineDark,
  },
  icon,
});
