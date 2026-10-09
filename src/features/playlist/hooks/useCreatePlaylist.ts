import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePlaylistService } from "@/api/lists/create";
import { Playlist, PlaylistRequest } from "../types/playlist.types";
import { toast } from "sonner";
import axios from "axios";

const createService = new CreatePlaylistService();

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation<Playlist, Error, PlaylistRequest>({
    mutationFn: (payload) => createService.execute(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success(`Caderno "${data.nome}" criado com sucesso!`);
    },
    onError: (err: unknown) => {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : "Não foi possível criar a playlist.";
      toast.error(message);
    },
  });
}
