import { api } from '@/lib/axios'

export interface PaymentDonor {
  valor: number
  campaign_id: number
}

export async function paymentDonor({
  valor,
  campaign_id
}: PaymentDonor) {
  const { data } = await api.post('/doacoes-campanha', {
    valor,
    campaign_id
  })
  return data
}
