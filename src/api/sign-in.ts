import { api } from '@/lib/axios'

export interface SignIn {
  email: string
  senha: string
}

export async function signIn({ email, senha }: SignIn) {
  const { data } = await api.post('/login', {
    email,
    senha,
  })
  return data
}
