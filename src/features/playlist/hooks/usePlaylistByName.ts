import { useQuery } from "@tanstack/react-query";
import { GetPlaylistByNameService } from "@/api/lists/get-by-name";
import { Playlist } from "../types/playlist.types";

const getByNameService = new GetPlaylistByNameService();

export function usePlaylistByName(name: string, initialData?: Playlist) {
  return useQuery<Playlist>({
    queryKey: ["playlist", name],
    queryFn: () => getByNameService.execute(name),
    initialData,
    enabled: !!name,
    staleTime: 1000 * 60 * 2,
  });
}
