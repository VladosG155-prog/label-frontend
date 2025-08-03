// hooks/useAddReleaseMutation.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useAddReleaseMutation = () => {
  const token = localStorage.getItem('auth_token');

  return useMutation({
    mutationFn: async (form) => {
      const data = new FormData();
      data.append('title', form.title);
      data.append('releaseDate', form.releaseDate);
      data.append('participants', form.participants);
      data.append('pitchRu', form.pitchRu);
      data.append('pitchEn', form.pitchEn);
      data.append('tariff', form.tariff);
      data.append('cover', form.cover);
      form.wavFiles.forEach((file) => data.append('wavFiles', file));

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/releases`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    },
  });
};
