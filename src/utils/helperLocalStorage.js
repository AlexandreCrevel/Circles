/**
 * Get the storage item
 * @param {string} storage
 * @returns
 */
export const getStorage = (storage) => {
  return localStorage.getItem(storage);
};
/**
 * remove the storage item
 * @param {string} storage
 * @returns
 */
export const removeStorage = (storage) => {
  return localStorage.removeItem(storage);
};
/**
 * set the storage item
 * @param {string} storage
 * @param {all} val
 * @returns
 */
export const setStorage = (storage, val) => {
  return localStorage.setItem(storage, val);
};
