/**
 * Generates string, contained randomly generated digits.
 * @param length - length of random id string.
 */
export const generateId = (length: number = 10): string =>
  `_${Math.random().toString().substring(2, length) +
  (length > 10 ? generateId(length - 10) : '')}`;
