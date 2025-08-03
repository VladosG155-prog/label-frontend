// hooks/useProfileQuery.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProfileQuery = () => {
  const token = localStorage.getItem('auth_token');

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.user;
    },
  });
};
