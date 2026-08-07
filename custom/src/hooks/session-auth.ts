const SESSION_KEY = 'pg_session_active';

declare global {
  // eslint-disable-next-line no-var
  var __pgSessionBootstrapped: boolean | undefined;
}

/** Mỗi lần load/reload trang (F5) — reset session tab */
export const beginBrowserSession = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  if (globalThis.__pgSessionBootstrapped) {
    return;
  }

  globalThis.__pgSessionBootstrapped = true;
  sessionStorage.removeItem(SESSION_KEY);
};

/** Gọi sau login thành công — cho phép restore session trong tab hiện tại */
export const markSessionActive = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.setItem(SESSION_KEY, '1');
};

export const isActiveBrowserSession = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return sessionStorage.getItem(SESSION_KEY) === '1';
};

export const clearSessionActive = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.removeItem(SESSION_KEY);
};
