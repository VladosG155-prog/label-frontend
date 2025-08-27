import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useApproveArtistMutation = () => {
  const token = localStorage.getItem('auth_token');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artistId) => {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/artists/approve`,
        { artistId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['artists']);
    },
  });
};
