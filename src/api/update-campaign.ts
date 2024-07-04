/* eslint-disable camelcase */
import { api } from '@/lib/axios'

export interface UpdateCampaignBody {
  id: number
  titulo: string
  descricao: string
  meta_arrecadacao: number
  valor_arrecadado: number
  status: 'ativo' | 'concluido' | 'pendente'
}

export async function updateCampaign({
  id,
  titulo,
  descricao,
  meta_arrecadacao,
  valor_arrecadado,
  status,
}: UpdateCampaignBody) {
  const { data } = await api.put(`/campanha/${id}`, {
    id,
    titulo,
    descricao,
    meta_arrecadacao,
    valor_arrecadado,
    status,
  })
  return data
}
