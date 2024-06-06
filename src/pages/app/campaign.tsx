import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Campaign() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-4 text-3xl font-bold">Campanhas</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <PlusCircle className="mr-2 size-4" />
            Nova Campanha
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Campanha</DialogTitle>
            <DialogDescription>Criar uma nova Campanha</DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            <div className="grid grid-cols-4 items-center gap-3 text-right">
              <Label htmlFor="name">Nome</Label>
              <Input
                className="col-span-3"
                placeholder="Digite o nome da sua Campanha"
                id="name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3 text-right">
              <Label htmlFor="price">Preço</Label>
              <Input
                className="col-span-3"
                placeholder="Digite o preço da sua Campanha"
                id="price"
              />
            </div>

            <DialogFooter>
              <DialogClose>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                Campanha de Desenvolvimento {i + 1}
              </h2>
              <h3 className="mb-2 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                distinctio aliquam repellendus. Ex, officia nostrum porro
                distinctio ipsum earum voluptatibus repellendus totam. Ad,
                repellendus! Esse, recusandae rem! Accusamus, voluptatem atque?{' '}
              </h3>
              <div className="flex justify-end">
                <Button size="sm" className="mr-2">
                  Editar
                </Button>
                <Button size="sm" variant="destructive">
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
