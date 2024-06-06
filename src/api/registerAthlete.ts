import { api } from '@/lib/axios'

export interface RegisterAthlete {
  name: string
  email: string
  password: string
  address: string
  phone: string
  age: string
  gender: string
}

export async function registerAthlete({
  name,
  email,
  password,
  address,
  phone,
  age,
  gender,
}: RegisterAthlete) {
  await api.post('/athletes', {
    name,
    email,
    password,
    address,
    phone,
    age,
    gender,
  })
}
