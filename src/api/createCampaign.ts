/* eslint-disable camelcase */
import { api } from '@/lib/axios'

export interface CreateCampaign {
  titulo: string
  descricao: string
  meta_arrecadacao: number
}

export async function createCampaign({
  titulo,
  descricao,
  meta_arrecadacao,
}: CreateCampaign) {
  await api.post('/campanhas', {
    titulo,
    descricao,
    meta_arrecadacao,
  })
}
