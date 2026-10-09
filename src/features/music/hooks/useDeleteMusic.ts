import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteMusicService } from "@/api/musics/delete";
import { toast } from "sonner";

const deleteService = new DeleteMusicService();

export function useDeleteMusic() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string; titulo: string }>({
    mutationFn: ({ id }) => deleteService.execute(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["musics"] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success(`"${variables.titulo}" removida.`);
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao excluir a música.";
      toast.error(message);
    },
  });
}
