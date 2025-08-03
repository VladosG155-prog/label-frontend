// hooks/useProfileQuery.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useArtistsQuery = () => {
  const token = localStorage.getItem('auth_token');

  return useQuery({
    queryKey: ['releases'],
    queryFn: async () => {
      const { data } = await axios.get('${process.env.BACKEND_URL}/artists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.artists;
    },
  });
};
