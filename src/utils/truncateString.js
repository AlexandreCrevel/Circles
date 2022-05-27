/**
 * truncate string if more than parameter
 * @param {*} string
 * @param {*} n
 * @returns
 */
export const truncateString = (string, n) => {
  if (string) {
    return string.length > n ? string.substring(0, n - 1) + '...' : string;
  }
};
