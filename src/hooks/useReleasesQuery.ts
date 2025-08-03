// hooks/useProfileQuery.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useReleasesQuery = () => {
  const token = localStorage.getItem('auth_token');

  return useQuery({
    queryKey: ['releases'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:4000/releases', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.releases;
    },
  });
};
