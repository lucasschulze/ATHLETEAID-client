import { z } from 'zod'

export const updateCampaignFormSchema = z.object({
  titulo: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  descricao: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  numero_time: z.coerce.number(),
  meta_arrecadacao: z.coerce.number(),
  valor_arrecadado: z.coerce.number(),
  conta_destino: z.string()
})
