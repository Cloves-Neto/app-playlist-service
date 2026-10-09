import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMusicService } from "@/api/musics/create";
import { MusicRequest, MusicResponse } from "@/features/music/types/music.types";
import { toast } from "sonner";

const createService = new CreateMusicService();

export function useCreateMusic() {
  const queryClient = useQueryClient();

  return useMutation<MusicResponse, Error, MusicRequest>({
    mutationFn: (payload) => createService.execute(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["musics"] });
      toast.success(`"${data.titulo}" anotada com sucesso!`);
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Não foi possível salvar a música.";
      toast.error(message);
    },
  });
}
