type CampaignStatus = 'ativo' | 'concluido' | 'pendente'

interface CampaignStatusProps {
  status: CampaignStatus
}

const campaignStatusMap: Record<CampaignStatus, string> = {
  ativo: 'Ativo',
  concluido: 'Concluido',
  pendente: 'Pendente',
}

export function CampaignStatus({ status }: CampaignStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'ativo' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}
      {status === 'concluido' && (
        <span className="h-2 w-2 rounded-full bg-green-200" />
      )}
      {status === 'pendente' && (
        <span className="h-2 w-2 rounded-full bg-orange-600" />
      )}

      <span className="bg-semibold">{campaignStatusMap[status]}</span>
    </div>
  )
}
