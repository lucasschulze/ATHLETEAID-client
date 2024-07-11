import { api } from '@/lib/axios'

export interface GetUserDoador {
  id: number
  nome: string
  nascimento: string
  telefone: string
  email: string
  cpf: string
  numConta: string
}

export async function getUserDoador() {
  const response = await api.get<GetUserDoador>('/doadorinfo')

  return response.data
}