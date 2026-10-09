import { z } from "zod";

export const playlistSchema = z.object({
  nome: z.string().min(1, "O nome da playlist é obrigatório"),
  descricao: z.string().optional().default(""),
});

export type PlaylistFormData = z.infer<typeof playlistSchema>;
