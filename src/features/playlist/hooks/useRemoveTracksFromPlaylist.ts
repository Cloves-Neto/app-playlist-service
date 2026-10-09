import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveMusicsPlaylistService } from "@/api/lists/remove-musics";
import { toast } from "sonner";

const removeMusicsService = new RemoveMusicsPlaylistService();

interface RemoveTracksParams {
  listName: string;
  musicIds: string[];
}

export function useRemoveTracksFromPlaylist() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, RemoveTracksParams>({
    mutationFn: ({ listName, musicIds }) =>
      removeMusicsService.execute(listName, { musicIds }),
    onSuccess: (_, { listName, musicIds }) => {
      queryClient.invalidateQueries({ queryKey: ["playlist", listName] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success(
        `${musicIds.length} ${
          musicIds.length === 1 ? "música removida" : "músicas removidas"
        } da playlist.`
      );
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao remover faixas da playlist.";
      toast.error(message);
    },
  });
}
