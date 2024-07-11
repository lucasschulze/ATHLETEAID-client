import { api } from '@/lib/axios'

export interface UpdateDoacao {
    cpf: string
    numConta: string
}

export async function updateDoacao({
    cpf,
    numConta
}: UpdateDoacao) {
  const { data } = await api.put(`/doador/infoPagamento`, {
    cpf,
    numConta
  })
  return data
}