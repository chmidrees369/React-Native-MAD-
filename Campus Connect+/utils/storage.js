import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a value under a key.
 * @template T
 * @param {string} key
 * @param {T} value
 * @returns {Promise<boolean>} true if saved successfully
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error(`❌ saveData: failed for key="${key}"`, e);
    return false;
  }
};

/**
 * Load a value by key.
 * @template T
 * @param {string} key
 * @returns {Promise<T|null>} parsed value or null
 */
export const loadData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`❌ loadData: failed for key="${key}"`, e);
    return null;
  }
};

/**
 * Remove a value by key.
 * @param {string} key
 * @returns {Promise<boolean>} true if removed successfully
 */
export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error(`❌ removeData: failed for key="${key}"`, e);
    return false;
  }
};

/**
 * Append an item to an array stored under key.
 * @template T
 * @param {string} key
 * @param {T} item
 * @returns {Promise<T[]>} the new array
 */
export const appendToList = async (key, item) => {
  try {
    const existing = await loadData(key);
    const updated = Array.isArray(existing) ? [...existing, item] : [item];
    await saveData(key, updated);
    return updated;
  } catch (e) {
    console.error(`❌ appendToList: failed for key="${key}"`, e);
    return [];
  }
};

/**
 * Merge an object into the stored value (must be an object).
 * @param {string} key
 * @param {Record<string, any>} partial
 * @returns {Promise<Record<string, any>|null>} merged object or null
 */
export const mergeData = async (key, partial) => {
  try {
    const existing = (await loadData(key)) || {};
    if (typeof existing !== 'object') {
      throw new Error('Existing value is not an object');
    }
    const merged = { ...existing, ...partial };
    await saveData(key, merged);
    return merged;
  } catch (e) {
    console.error(`❌ mergeData: failed for key="${key}"`, e);
    return null;
  }
};

/**
 * Get all keys in AsyncStorage.
 * @returns {Promise<string[]>}
 */
export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    console.error('❌ getAllKeys failed', e);
    return [];
  }
};

/**
 * Clear all storage.
 * @returns {Promise<boolean>} true if cleared successfully
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error('❌ clearAll failed', e);
    return false;
  }
};

/**
 * Save a value with a TTL (in milliseconds).
 * @template T
 * @param {string} key
 * @param {T} value
 * @param {number} ttlMs  Time-to-live in ms
 * @returns {Promise<boolean>}
 */
export const saveWithExpiry = async (key, value, ttlMs) => {
  const payload = {
    data: value,
    expiresAt: Date.now() + ttlMs,
  };
  return saveData(key, payload);
};

/**
 * Load a value saved with saveWithExpiry; returns null if expired.
 * @template T
 * @param {string} key
 * @returns {Promise<T|null>}
 */
export const loadWithExpiry = async key => {
  try {
    const payload = await loadData(key);
    if (!payload || typeof payload !== 'object') return null;
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      await removeData(key);
      return null;
    }
    return payload.data;
  } catch (e) {
    console.error(`❌ loadWithExpiry: failed for key="${key}"`, e);
    return null;
  }
};
