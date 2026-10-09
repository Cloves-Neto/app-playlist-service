import { useQuery } from "@tanstack/react-query";
import { GetAllPlaylistsService } from "@/api/lists/get-all";
import { Playlist } from "../types/playlist.types";

const getAllService = new GetAllPlaylistsService();

export function usePlaylists() {
  return useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: () => getAllService.execute(),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
