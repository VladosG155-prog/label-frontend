import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Track {
  title: string;
  duration: string;
  licensorShare: number;
  year: number;
  rightsPeriod: { start: string; end: string };
}

interface CreateDocPayload {
  artists: { id: string; username: string }[];
  tracks: Track[];
}

export function useCreateDocument() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('auth_token');

  return useMutation({
    mutationFn: async (payload: CreateDocPayload) => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/documents/create`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // <-- важно
        }
      );

      // создаем ссылку и скачиваем
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contracts.zip'); // имя скачиваемого файла
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}
