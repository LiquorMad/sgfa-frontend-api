import { z } from "zod"

export const formSchemaCreateZona = z.object({
    nome: z.string(),
    idConcelho: z.string(),
  })

  export const formSchemaUpdateZona = z.object({
    id: z.number(),
    nome: z.string(),
    concelho: z.string(),
  })