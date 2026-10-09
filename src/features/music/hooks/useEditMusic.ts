import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditMusicService } from "@/api/musics/edit";
import { MusicRequest, MusicResponse } from "@/features/music/types/music.types";
import { toast } from "sonner";
import axios from "axios";

const editService = new EditMusicService();

interface EditMusicParams {
  id: string;
  payload: MusicRequest;
}

export function useEditMusic() {
  const queryClient = useQueryClient();

  return useMutation<MusicResponse, Error, EditMusicParams>({
    mutationFn: ({ id, payload }) => editService.execute(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["musics"] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success(`"${data.titulo}" atualizada com sucesso!`);
    },
    onError: (err: unknown) => {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : "Erro ao atualizar a música.";
      toast.error(message);
    },
  });
}
