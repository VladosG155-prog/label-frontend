// hooks/useUpdateProfile.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('auth_token');

  return useMutation({
    mutationFn: async (updatedData) => {
      return await axios.put('${process.env.BACKEND_URL}/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
