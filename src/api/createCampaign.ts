/* eslint-disable camelcase */
import { api } from '@/lib/axios'

import { Campanha } from './get-campaign'

export interface CreateCampaign {
  titulo: string
  descricao: string
  meta_arrecadacao: number
}

export async function createCampaign({
  titulo,
  descricao,
  meta_arrecadacao,
}: CreateCampaign): Promise<Campanha> {
  const { data } = await api.post('/campanhas', {
    titulo,
    descricao,
    meta_arrecadacao,
  })
  return data
}
