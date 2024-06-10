import { api } from '@/lib/axios'

export interface RegisterAthlete {
  nome: string
  genero: string
  nascimento: string
  telefone: string
  email: string
  senha: string
}

export async function registerAthlete({
  nome,
  genero,
  nascimento,
  telefone,
  email,
  senha,
}: RegisterAthlete) {
  await api.post('/atletas', {
    nome,
    genero,
    nascimento,
    telefone,
    email,
    senha,
  })
}
