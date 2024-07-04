/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getCampaignId } from '@/api/get-campaignId'
import { updateCampaign } from '@/api/update-campaign'
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
import { updateCampaignFormSchema } from '@/schemas/updateCampaignFormSchema'

type UpdateCampaignFormSchema = z.infer<typeof updateCampaignFormSchema>

export function ViewCampaign() {
  const [openModal, setOpenModal] = useState(false)
  const params = useParams()
  const idCampaign = z.coerce.number().parse(params.id)

  const { data: resultViewCampaign } = useQuery({
    queryKey: ['campaigns', idCampaign],
    queryFn: () => getCampaignId({ idCampaign }),
  })

  const form = useForm<UpdateCampaignFormSchema>({
    resolver: zodResolver(updateCampaignFormSchema),
    values: {
      titulo: resultViewCampaign?.titulo ?? '',
      descricao: resultViewCampaign?.descricao ?? '',
      meta_arrecadacao: resultViewCampaign?.meta_arrecadacao ?? 0,
      valor_arrecadado: resultViewCampaign?.valor_arrecadado ?? 0,
      status: resultViewCampaign?.status ?? 'ativo',
    },
  })
  const { reset } = form

  const { mutateAsync: updateCampaignFn } = useMutation({
    mutationFn: updateCampaign,
    onSuccess(
      _,
      { titulo, descricao, meta_arrecadacao, valor_arrecadado, status },
    ) {
      queryClient.setQueryData(['campaigns', idCampaign], {
        titulo,
        descricao,
        meta_arrecadacao,
        valor_arrecadado,
        status,
      })
    },
  })

  async function handleUpdateCampagin(data: UpdateCampaignFormSchema) {
    try {
      await updateCampaignFn({
        id: idCampaign,
        titulo: data.titulo,
        descricao: data.descricao,
        meta_arrecadacao: data.meta_arrecadacao,
        valor_arrecadado: data.valor_arrecadado,
        status: data.status,
      })

      toast.success('Atualizado com Sucesso')
      setOpenModal(false)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-lg bg-white shadow-md md:grid-cols-2">
        <div className="p-6">
          <h2 className="text-justify text-2xl font-semibold text-gray-800">
            {resultViewCampaign?.titulo}
          </h2>
          <h2 className="mt-10 text-xl font-bold text-gray-600">Descrição:</h2>
          <p className="mt-5 text-base text-gray-600">
            {resultViewCampaign?.descricao}
          </p>
          <div className="mt-4 space-y-5">
            <p className="text-xl font-medium text-gray-900">
              <strong>Meta Arrecadação: </strong>
              {resultViewCampaign?.meta_arrecadacao.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="text-xl font-medium text-gray-900">
              <strong>Valor Arrecadado: </strong>
              {resultViewCampaign?.valor_arrecadado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="text-sm text-gray-500">
              {resultViewCampaign?.created_at &&
                formatDistanceToNow(resultViewCampaign.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
            </p>
            <p className="text-sm text-gray-500">
              {resultViewCampaign?.status}
            </p>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild>
                <Button className="mb-4">Editar Campanha</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Campanha</DialogTitle>
                  <DialogDescription>Atualizar Campanha</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(handleUpdateCampagin)}
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
                    <div className="grid grid-cols-4 items-center justify-between gap-3">
                      <FormLabel>
                        Arrecadado <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="valor_arrecadado"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl>
                              <Input
                                id="valor_arrecadado"
                                type="number"
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
                    <div className="grid grid-cols-4 items-center justify-between gap-3">
                      <FormLabel>
                        Status <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl>
                              <Input
                                id="status"
                                type="text"
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
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <img
            className="h-full w-full overflow-hidden object-cover"
            src="https://www.ceara.gov.br/wp-content/uploads/2021/06/esej.jpeg"
            alt="Meta de Dinheiro da Campanha"
          />
        </div>
      </div>
    </div>
  )
}
