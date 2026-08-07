import { getAppConfig, initAppConfig, type AppConfig } from '@photo-gallery/config';
import { configureApiClient } from './api-client.js';

let initialized = false;

export const bootstrapAppConfig = (env: Record<string, string | undefined>): AppConfig => {
  if (!initialized) {
    const config = initAppConfig(env);
    configureApiClient(config.publicEnv.immichServerUrl);
    initialized = true;
    return config;
  }
  return getAppConfig();
};
