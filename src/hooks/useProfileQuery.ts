// hooks/useProfileQuery.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProfileQuery = () => {
  const token = localStorage.getItem('auth_token');

  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:4000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.user;
    },
  });
};
