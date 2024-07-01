/* eslint-disable camelcase */
import { api } from '@/lib/axios'

interface UpdateCampaignBody {
  id: number
  titulo: string
  descricao: string
  meta_arrecadacao: number
  valor_arrecadacao: number
  status: 'ativo' | 'concluido' | 'pendente'
}

export async function updateCampaign({
  id,
  titulo,
  descricao,
  meta_arrecadacao,
  valor_arrecadacao,
  status,
}: UpdateCampaignBody) {
  await api.put(`/campanhas/${id}`, {
    id,
    titulo,
    descricao,
    meta_arrecadacao,
    valor_arrecadacao,
    status,
  })
}
