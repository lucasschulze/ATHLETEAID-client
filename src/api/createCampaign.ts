/* eslint-disable camelcase */
import { api } from '@/lib/axios'

import { Campaign } from './get-campaign'

export interface CreateCampaign {
  titulo: string
  descricao: string
  numero_time: number
  meta_arrecadacao: number
  valor_arrecadado: number
  conta_destino: string
}

export async function createCampaign({
  titulo,
  descricao,
  numero_time,
  meta_arrecadacao,
  valor_arrecadado,
  conta_destino
}: CreateCampaign): Promise<Campaign> {
  const { data } = await api.post('/campanhas', {
    titulo,
    descricao,
    numero_time,
    meta_arrecadacao,
    valor_arrecadado,
    conta_destino
  })
  return data
}