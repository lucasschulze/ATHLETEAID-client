import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { deleteCampaign } from '@/api/deleteCampaign'
import { Card } from '@/components/Card'
import { queryClient } from '@/lib/react-query'
import { deleteCampaignFormSchema } from '@/schemas/deleteCampaignFormSchema'

export type DeleteCampaignFormSchema = z.infer<typeof deleteCampaignFormSchema>

export interface CampaignProps {
  campanhas: {
    id: number
    titulo: string
    descricao: string
    meta_arrecadacao: number
    valor_arrecadacao: number
    status: 'ativo' | 'concluido' | 'pendente'
    created_at: string
  }
}

export function ListCampaign({ campanhas }: CampaignProps) {
  const navigate = useNavigate()

  const { mutateAsync: deleteCampaignFn } = useMutation({
    mutationFn: deleteCampaign,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })

  async function handleDeleteCampaign(data: DeleteCampaignFormSchema) {
    try {
      await deleteCampaignFn({
        id: data.id,
      })

      toast.success('Campanha excluida com Sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card.Root>
        <Card.Image
          src="https://static.vakinha.com.br/uploads/vakinha/image/4903610/1719414379.102.png?ims=340x170"
          alt="Imagem Campanha"
        />
        <Card.Content
          textTitle={campanhas.titulo}
          textDescrition={campanhas.descricao}
          textCreatedAt={campanhas.created_at}
          textCurrent={campanhas.meta_arrecadacao}
        />
        <Card.Actions
          textStatus={campanhas.status}
          navigateId={campanhas.id}
          onDeleteAction={() => handleDeleteCampaign({ id: campanhas.id })}
          onNavigateId={() => navigate(`/campanha/${campanhas.id}`)}
        />
      </Card.Root>
    </>
  )
}
