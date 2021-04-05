import { LOCAL_STORAGE } from 'src/core/store/values';

export const addToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
  const accountsStr = localStorage.getItem(LOCAL_STORAGE.ACCOUNTS);
  if (accountsStr) {
    const accounts = JSON.parse(accountsStr);
    if (Array.isArray(accounts)) {
      if (!accounts.includes(token)) {
        const newAccounts = [token, ...accounts];
        localStorage.setItem(LOCAL_STORAGE.ACCOUNTS, JSON.stringify(newAccounts));
      }
    } else {
      localStorage.setItem(LOCAL_STORAGE.ACCOUNTS, JSON.stringify([token]));
    }
  } else {
    localStorage.setItem(LOCAL_STORAGE.ACCOUNTS, JSON.stringify([token]));
  }
};
