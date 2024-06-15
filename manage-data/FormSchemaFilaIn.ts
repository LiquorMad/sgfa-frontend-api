import { z } from "zod"

export const formSchemaCreateFilaIn = z.object({
    idRota: z.string(),
    idVeiculo: z.string(),
  })

  export const formSchemaUpdateFilaIn = z.object({
    id: z.number(),
    rota: z.string(),
    veiculo: z.string(),
  })