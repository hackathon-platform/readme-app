import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

// Use Expo-public envs so they are available on device.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY'
  );
}

const isServer = typeof window === 'undefined';

// No-op storage for SSR / CLI to avoid touching any native module
const serverSafeStorage = {
  getItem: async (_key: string) => null as string | null,
  setItem: async (_key: string, _value: string) => {},
  removeItem: async (_key: string) => {},
};

// Simple in-memory fallback so the app still runs if SecureStore isn’t available
const memory: Record<string, string> = {};
const memoryStorage = {
  getItem: async (key: string) => (key in memory ? memory[key] : null),
  setItem: async (key: string, value: string) => {
    memory[key] = value;
  },
  removeItem: async (key: string) => {
    delete memory[key];
  },
};

// A safe wrapper around expo-secure-store that won’t crash if native module is missing
const safeSecureStore = {
  async available() {
    try {
      if (typeof SecureStore.isAvailableAsync === 'function') {
        return await SecureStore.isAvailableAsync();
      }
    } catch {
      // fall through
    }
    return false;
  },
  async getItem(key: string) {
    try {
      if (
        typeof SecureStore.getItemAsync === 'function' &&
        (await safeSecureStore.available())
      ) {
        return await SecureStore.getItemAsync(key);
      }
    } catch {
      // fall back
    }
    return await memoryStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    try {
      if (
        typeof SecureStore.setItemAsync === 'function' &&
        (await safeSecureStore.available())
      ) {
        await SecureStore.setItemAsync(key, value);
        return;
      }
    } catch {
      // fall through to memory
    }
    await memoryStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    try {
      if (
        typeof SecureStore.deleteItemAsync === 'function' &&
        (await safeSecureStore.available())
      ) {
        await SecureStore.deleteItemAsync(key);
        return;
      }
    } catch {
      // fall through to memory
    }
    await memoryStorage.removeItem(key);
  },
};

const storage = isServer ? serverSafeStorage : safeSecureStore;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    persistSession: !isServer,
    autoRefreshToken: !isServer,
    detectSessionInUrl: false,
  },
});
