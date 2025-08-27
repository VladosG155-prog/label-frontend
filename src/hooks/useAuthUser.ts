import { useQuery } from "@tanstack/react-query";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const fetchUser = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('No token');

  const res = await fetch(`${BACKEND}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: fetchUser,
    retry: false,
  });
};
