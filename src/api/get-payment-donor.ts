import { api } from '@/lib/axios'

export interface PaymentDonorResponse {
  payments: {
    nome: string
    email: string
    cpf: number
    valor: number
    time: Date | null
    url: string
  }
}

export async function getPaymentDonor() {
  const response = await api.get<PaymentDonorResponse>('/pagamentos')

  return response.data
}
