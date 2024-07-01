import { z } from 'zod'

export const deleteCampaignFormSchema = z.object({
  id: z.number().int(),
})
