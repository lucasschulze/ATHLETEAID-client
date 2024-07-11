import { api } from '@/lib/axios'

export interface GetHistoricoAtleta {
  campanha_id: number
  campanha_titulo: string
  doador_id: number
  doador_nome: string
  valor: number
}


export async function getHistoricoAtleta() {
  const response = await api.get<GetHistoricoAtleta[]>('/historico-campanha')

  return response.data
}