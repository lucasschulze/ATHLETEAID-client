import { api } from '@/lib/axios'

export interface GetUserAtleta {
  id: number
  nome: string
  genero: string
  nascimento: string
  telefone: string
  email: string
  senha: string
}

export async function getUserAtleta() {
  const response = await api.get<GetUserAtleta>('/atletainfo')

  return response.data
}