import { DialogClose } from '@radix-ui/react-dialog'

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
  onDeleteAction: () => void
  onNavigateId: () => void
}

export function CardActions({
  onNavigateId,
  onDeleteAction,
}: CardActionsProps) {
  return (
    <div className="pb-4 pl-4 pr-2">
      <div className="flex w-full items-center justify-between">
        <div>
        </div>
        <div className="flex gap-2 ">
          <Button size="sm" variant="default" onClick={onNavigateId}>
            Visualizar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="destructive">
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
                <DialogClose>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
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
