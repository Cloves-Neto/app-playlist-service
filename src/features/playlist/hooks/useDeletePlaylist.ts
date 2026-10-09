import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeletePlaylistService } from "@/api/lists/delete";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const deleteService = new DeletePlaylistService();

export function useDeletePlaylist() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, string>({
    mutationFn: (listName) => deleteService.execute(listName),
    onSuccess: (_, listName) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success(`Playlist "${listName}" excluída.`);
      router.push("/");
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Não foi possível excluir a playlist.";
      toast.error(message);
    },
  });
}
