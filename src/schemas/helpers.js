export const isValidABN = (abn) => {
  if (!abn) return false;
  return /^\d{11}$/.test(abn);
};
