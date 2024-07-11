import { api } from '@/lib/axios'

export interface UpdateAtletaId {
    id: number
    nome: string
    genero: string
    nascimento: string
    telefone: string
    email: string
    senha: string
}

export async function updateAtletaId({
    id,
    nome,
    genero,
    nascimento,
    telefone,
    email,
    senha
}: UpdateAtletaId) {
  const { data } = await api.put(`/atletas/${id}`, {
    id,
    nome,
    genero,
    nascimento,
    telefone,
    email,
    senha
  })
  return data
}