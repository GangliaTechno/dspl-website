import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

const storage = new Map();
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: {
    clear: () => storage.clear(),
    getItem: (key) => storage.has(key) ? storage.get(key) : null,
    key: (index) => Array.from(storage.keys())[index] ?? null,
    removeItem: (key) => storage.delete(key),
    setItem: (key, value) => storage.set(String(key), String(value)),
    get length() { return storage.size; },
  },
});

// Cleanup DOM after each test case
afterEach(() => {
  cleanup();
});
