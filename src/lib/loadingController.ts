export type LoadingPayload = {
  active: boolean;
  text?: string;
};

export type LoadingListener = (payload: LoadingPayload) => void;

const listeners = new Set<LoadingListener>();

export const loadingController = {
  subscribe(listener: LoadingListener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  show(text?: string) {
    listeners.forEach((listener) => listener({ active: true, text }));
  },
  hide() {
    listeners.forEach((listener) => listener({ active: false }));
  },
};