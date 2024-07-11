import { api } from '@/lib/axios'
import { IUser } from '@/pages/Context/auth-context'

export interface SignIn {
  email: string
  senha: string
}

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('athleted.token', JSON.stringify(user))
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('athleted.token')

  if (!json) {
    return null
  }

  const user = JSON.parse(json)

  return user ?? null
}

export async function signIn({ email, senha }: SignIn) {
  const { data } = await api.post('/login', {
    email,
    senha,
  })
  return data
}
