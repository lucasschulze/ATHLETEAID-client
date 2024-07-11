import { z } from 'zod'

export const paymentDoadoFormSchema = z.object({
  valor: z.coerce.number(),
  campaign_id: z.coerce.number()
})