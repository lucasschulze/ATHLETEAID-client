import { api } from '@/lib/axios'

export interface CampaignDetailsParams {
  idCampaign: number
}

export interface GetCampanhaDetailsResponse {
  id: number
  titulo: string
  descricao: string
  numero_time: number
  meta_arrecadacao: number
  valor_arrecadado: number
  conta_destino: string
  atleta_id: number
  created_at: string
}

export async function getCampaignId({ idCampaign }: CampaignDetailsParams) {
  const response = await api.get<GetCampanhaDetailsResponse>(
    `/campanha-atleta/${idCampaign}`,
  )

  return response.data
}
