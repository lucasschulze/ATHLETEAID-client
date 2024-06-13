import { api } from '@/lib/axios'

export interface GetCampaignResponse {
  titulo: string
  descricao: string
  meta_arrecadacao: number
  valor_arrecadacao: number
  status: string
}

export async function getCampaign() {
  const response = await api.get<GetCampaignResponse>('/campanhas')

  return response.data
}
