import { api } from '@/lib/axios'

export interface RegisterDonor {
  nome: string
  nascimento: string
  telefone: string
  email: string
  senha: string
}

export async function registerDonor({
  nome,
  nascimento,
  telefone,
  email,
  senha,
}: RegisterDonor) {
  await api.post('/doadores', {
    nome,
    nascimento,
    telefone,
    email,
    senha,
  })
}
