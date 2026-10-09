import { httpClient } from "@/api/client/httpClient";

export class DeleteMusicService {
  async execute(id: string): Promise<void> {
    await httpClient.delete(`/musics/${id}`);
  }
}
