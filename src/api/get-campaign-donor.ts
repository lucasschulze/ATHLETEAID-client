import { api } from '@/lib/axios'

export interface GetCampaignQuery {
  pageIndex?: number | null
}

export interface Campaign {
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

export interface GetCampaignResponse {
  campanhas: Campaign[]
  meta: {
    itemsPorPagina: number
    indiceDaPagina: number
    totalCampanhas: number
  }
}

export async function getCampaignDonor({ pageIndex }: GetCampaignQuery) {
  const response = await api.get<GetCampaignResponse>('/campanha', {
    params: {
      pageIndex,
    },
  })

  return response.data
}