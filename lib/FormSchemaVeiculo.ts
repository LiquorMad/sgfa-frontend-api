import { z } from "zod"

export const formSchemaVeiculo = z.object({
    idTipo: z.string(),
    matricula: z.string(),
    cor: z.string(),

  })

  export const formSchemaUpdateFilaIn = z.object({
    id: z.number(),
    rota: z.string(),
    veiculo: z.string(),
  })