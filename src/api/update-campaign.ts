/* eslint-disable camelcase */
import { api } from '@/lib/axios'

export interface UpdateCampaignBody {
  id: number
  titulo: string
  descricao: string
  numero_time: number
  meta_arrecadacao: number
  valor_arrecadado: number
  conta_destino: string
}

export async function updateCampaign({
  id,
  titulo, 
  descricao, 
  numero_time, 
  meta_arrecadacao, 
  valor_arrecadado, 
  conta_destino 
}: UpdateCampaignBody) {
  const { data } = await api.put(`/campanhas/${id}`, {
    id,
    titulo, 
    descricao, 
    numero_time, 
    meta_arrecadacao, 
    valor_arrecadado, 
    conta_destino 
  })
  return data
}
