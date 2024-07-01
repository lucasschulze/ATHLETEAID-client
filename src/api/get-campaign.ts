import { api } from '@/lib/axios'

export interface GetCampaignQuery {
  pageIndex?: number | null
}

export interface Campanha {
  id: number
  titulo: string
  descricao: string
  meta_arrecadacao: number
  valor_arrecadacao: number
  status: 'ativo' | 'concluido' | 'pendente'
  created_at: string
}

export interface GetCampaignResponse {
  campanhas: Campanha[]
  meta: {
    itemsPorPagina: number
    indiceDaPagina: number
    totalCampanhas: number
  }
}

export async function getCampaign({ pageIndex }: GetCampaignQuery) {
  const response = await api.get<GetCampaignResponse>('/campanha', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
