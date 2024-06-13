import { z } from 'zod'

export const createCampaignFormSchema = z.object({
  titulo: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  descricao: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  meta_arrecadacao: z.coerce.number(),
})
