import { api } from '@/lib/axios'

export interface CampaignDetailsParams {
  id: string
}

export interface GetCampanhaDetailsResponse {
  id: number
  titulo: string
  descricao: string
  meta_arrecadacao: number
  valor_arrecadacao: number
  status: 'ativo' | 'concluido' | 'pendente'
  created_at: string
}

export async function getCampaign({ id }: CampaignDetailsParams) {
  const response = await api.get<GetCampanhaDetailsResponse>(`/campanha/${id}`)

  return response.data
}
