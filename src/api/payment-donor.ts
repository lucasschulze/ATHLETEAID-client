import { api } from '@/lib/axios'

export interface PaymentDonorCampaign {
  nome: string
  email: string
  cpf: string
  valor: number
}

export async function paymentDonorCampaign({
  nome,
  email,
  cpf,
  valor,
}: PaymentDonorCampaign) {
  const { data } = await api.post('/pagamentos', {
    nome,
    email,
    cpf,
    valor,
  })
  return data
}
