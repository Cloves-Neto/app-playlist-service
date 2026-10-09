import { z } from "zod";

export const musicSchema = z.object({
  titulo: z.string().min(1, "O título da música é obrigatório"),
  artista: z.string().min(1, "O artista é obrigatório"),
  genero: z.string().min(1, "O gênero é obrigatório"),
  ano: z.coerce
    .number()
    .int("O ano deve ser um número inteiro")
    .min(1900, "Ano deve ser posterior a 1900")
    .max(2050, "Ano inválido"),
  album: z.string().min(1, "O álbum é obrigatório"),
});

export type MusicFormData = z.infer<typeof musicSchema>;
