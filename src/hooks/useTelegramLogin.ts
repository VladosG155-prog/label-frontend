// hooks/useTelegramLogin.ts
import { useMutation } from '@tanstack/react-query';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const requestTelegramLogin = async () => {
  const res = await fetch(`${BACKEND}/auth/telegram/request`, { method: 'POST' });
  if (!res.ok) throw new Error('Telegram login request failed');
  return res.json();
};

export const useTelegramLogin = () => {
  return useMutation({
    mutationFn: requestTelegramLogin,
  });
};
