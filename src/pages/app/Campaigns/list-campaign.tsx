import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { CampaignStatus } from './campaign-status'

export interface CampaignProps {
  campaign: {
    titulo: string
    descricao: string
    meta_arrecadacao: number
    valor_arrecadacao: number
    status: 'ativo' | 'concluido' | 'pendente'
  }
}

export function ListCampaign({ campaign }: CampaignProps) {
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{campaign.titulo}</h2>
          <h3 className="mb-2 text-sm text-muted-foreground">
            {campaign.descricao}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <CampaignStatus status={campaign.status} />
            </div>
            <div>
              <Button size="sm" className="mr-2">
                Editar
              </Button>
              <Button size="sm" className="mr-2" variant="destructive">
                Excluir
              </Button>
              <Link to={'/pagamento'}>
                <Button size="sm" className="bg-emerald-500">
                  Doar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
