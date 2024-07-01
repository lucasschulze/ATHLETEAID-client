import { CampaignStatus } from '@/pages/app/Campaigns/campaign-status'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface CardActionsProps {
  textStatus: 'ativo' | 'concluido' | 'pendente'
  navigateId: number
  onDeleteAction: () => void
  onNavigateId: () => void
}

export function CardActions({
  textStatus,
  onNavigateId,
  onDeleteAction,
}: CardActionsProps) {
  return (
    <div className="pb-4 pl-4 pr-2">
      <div className="flex w-full items-center justify-between">
        <div>
          <CampaignStatus status={textStatus} />
        </div>
        <div className="flex gap-2 ">
          <Button
            size="sm"
            variant="default"
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={onNavigateId}
          >
            Visualizar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
                Excluir
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir Campanha</DialogTitle>
                <DialogDescription className="text-base">
                  Tem Certeza que deseja excluir campanha?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button
                  onClick={onDeleteAction}
                  type="button"
                  variant="destructive"
                >
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
