// hooks/useTelegramPolling.ts
import { useQuery } from '@tanstack/react-query';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const pollLoginStatus = async (sessionToken: string) => {
  const res = await fetch(`${BACKEND}/auth/poll?token=${sessionToken}`);
  if (!res.ok) throw new Error('Polling failed');
  return res.json();
};

export const useTelegramPolling = (sessionToken: string | null, hasAuthToken: boolean) => {
  console.log('sess',sessionToken);

  return useQuery({
    queryKey: ['pollLogin', sessionToken],
    queryFn: () => pollLoginStatus(sessionToken!),
    enabled: Boolean(sessionToken) && !hasAuthToken,
    refetchInterval: 2000,
  });
};
