import { api } from '@/lib/axios'

export interface RegisterDonor {
  name: string
  email: string
  password: string
  address: string
  phone: string
}

export async function registerDonor({
  name,
  email,
  password,
  address,
  phone,
}: RegisterDonor) {
  await api.post('/doadores', {
    name,
    email,
    password,
    address,
    phone,
  })
}
