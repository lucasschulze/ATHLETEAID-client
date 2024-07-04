import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createCampaign } from '@/api/createCampaign'
import { getCampaign } from '@/api/get-campaign'
import { Pagination } from '@/components/pagination'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'
import { createCampaignFormSchema } from '@/schemas/createCampaignFormSchema'

import { ListCampaign } from './list-campaign'

export type CreateCampaignFormSchema = z.infer<typeof createCampaignFormSchema>

export function Campaign() {
  const [openShowModal, setShowOpenModal] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = z.coerce
    .number()
    .transform((page) => page + 0)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['campaigns', pageIndex],
    queryFn: () => getCampaign({ pageIndex }),
    staleTime: 100 * 100 * 10, // 10 segundos
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  const form = useForm<CreateCampaignFormSchema>({
    resolver: zodResolver(createCampaignFormSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      meta_arrecadacao: 0,
    },
  })
  const { reset } = form

  const { mutateAsync: createCampaignFn } = useMutation({
    mutationFn: createCampaign,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })

  async function handleCreateCampaign(data: CreateCampaignFormSchema) {
    try {
      await createCampaignFn({
        titulo: data.titulo,
        descricao: data.descricao,
        meta_arrecadacao: data.meta_arrecadacao,
      })

      toast.success('Campanha cadastro com sucesso')
      setShowOpenModal(false)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Helmet title="Campanhas" />
      <div className="px-4 py-1">
        <h1 className="mb-4 text-3xl font-bold">Campanhas</h1>
        <Dialog open={openShowModal} onOpenChange={setShowOpenModal}>
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

            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(handleCreateCampaign)}
              >
                <div className="grid grid-cols-4 items-center justify-between gap-3">
                  <FormLabel>
                    Título <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input
                            id="titulo"
                            type="text"
                            required
                            className="col-span-3"
                            placeholder="Digite seu Título"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-4 items-center justify-between gap-3">
                  <FormLabel>
                    Descrição <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Textarea
                            id="descricao"
                            required
                            placeholder="Digite sua Descrição"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-4 items-center justify-between gap-3">
                  <FormLabel>
                    Arrecadação <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="meta_arrecadacao"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormControl>
                          <Input
                            id="meta_arrecadacao"
                            type="number"
                            step="0.01"
                            min="0.01"
                            required
                            placeholder="Digite sua Arrecadação"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result?.campanhas.map((campanhas) => {
            return <ListCampaign key={campanhas.id} campanhas={campanhas} />
          })}
        </div>
        {result && (
          <Pagination
            onPageChange={handlePaginate}
            indiceDaPagina={result.meta.indiceDaPagina}
            totalCampanha={result.meta.totalCampanhas}
            itemsPorPagina={result.meta.itemsPorPagina}
          />
        )}
      </div>
    </>
  )
}
