import { useQuery } from "@tanstack/react-query";
import { SearchMusicService } from "@/api/musics/search";
import { MusicResponse } from "@/features/music/types/music.types";

const searchService = new SearchMusicService();

export function useMusics(query: string = "") {
  return useQuery<MusicResponse[]>({
    queryKey: ["musics", query],
    queryFn: () => searchService.execute(query.trim()),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
