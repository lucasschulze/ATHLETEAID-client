import { api } from '@/lib/axios'

export interface CampaignDetailsParams {
  idCampaign: number
}

export interface GetCampanhaDetailsResponse {
  id: number
  titulo: string
  descricao: string
  meta_arrecadacao: number
  valor_arrecadado: number
  status: 'ativo' | 'concluido' | 'pendente'
  created_at: string
}

export async function getCampaignId({ idCampaign }: CampaignDetailsParams) {
  const response = await api.get<GetCampanhaDetailsResponse>(
    `/campanha/${idCampaign}`,
  )

  return response.data
}
