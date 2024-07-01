import { api } from '@/lib/axios'

export interface DeleteCampaign {
  id: number
}

export async function deleteCampaign({ id }: DeleteCampaign) {
  await api.delete(`/campanha/${id}`)
}
