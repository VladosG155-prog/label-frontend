// hooks/useCreateArtist.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ArtistPayload {
  name: string;
  nickname?: string;
  lastName?: string;
  surname?: string;
  INN?: string;
  age?: number;
  email?: string;
  spotify?: string;
  yandex?: string;
  soundcloud?: string;
  vk?: string;
  appleMusic?: string;
}

export function useCreateArtist() {
  const queryClient = useQueryClient();
 const token = localStorage.getItem('auth_token');
  return useMutation({
    mutationFn: async (artist: ArtistPayload) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/artists/create`,
        artist,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      // 🔹 Обновляем кэш артистов, если он используется где-то через useQuery
      queryClient.invalidateQueries({ queryKey: ["releases"] });
    },
  });
}
