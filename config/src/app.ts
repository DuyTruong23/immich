import { createFeatureFlags, type FeatureFlags } from './features.js';
import { createPublicEnv, type PublicEnv } from './env.js';

export interface AppConfig {
  publicEnv: PublicEnv;
  features: FeatureFlags;
}

export const createAppConfig = (env: Record<string, string | undefined> = {}): AppConfig => {
  const publicEnv = createPublicEnv(env);
  const features = createFeatureFlags(env, publicEnv);
  return { publicEnv, features };
};

/** Singleton config — khởi tạo từ $env/static/public trong layout */
let appConfig: AppConfig | undefined;

export const initAppConfig = (env: Record<string, string | undefined>): AppConfig => {
  appConfig = createAppConfig(env);
  return appConfig;
};

export const getAppConfig = (): AppConfig => {
  if (!appConfig) {
    throw new Error('App config chưa được khởi tạo. Gọi initAppConfig() trong root layout.');
  }
  return appConfig;
};
