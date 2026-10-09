import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddMusicsToPlaylistService } from "@/api/lists/add-musics";
import { Playlist } from "../types/playlist.types";
import { toast } from "sonner";
import axios from "axios";

const addMusicsService = new AddMusicsToPlaylistService();

interface AddTracksParams {
  listName: string;
  musicIds: string[];
}

export function useAddTracksToPlaylist() {
  const queryClient = useQueryClient();

  return useMutation<Playlist, Error, AddTracksParams>({
    mutationFn: ({ listName, musicIds }) =>
      addMusicsService.execute(listName, { musicIds }),
    onSuccess: async (updatedPlaylist, { listName, musicIds }) => {
      // 1. Atualiza imediatamente o cache da playlist com os dados normalizados retornados
      if (updatedPlaylist) {
        queryClient.setQueryData(["playlist", listName], updatedPlaylist);
      }

      // 2. Invalida e força re-execução da consulta para garantir sincronização com o banco
      await queryClient.invalidateQueries({
        queryKey: ["playlist", listName],
        refetchType: "all",
      });
      await queryClient.refetchQueries({
        queryKey: ["playlist", listName],
      });
      await queryClient.invalidateQueries({
        queryKey: ["playlists"],
        refetchType: "all",
      });

      toast.success(
        `${musicIds.length} ${
          musicIds.length === 1 ? "música adicionada" : "músicas adicionadas"
        } à playlist!`
      );
    },
    onError: (err: unknown) => {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
        ? err.message
        : "Erro ao adicionar faixas à playlist.";
      toast.error(message);
    },
  });
}