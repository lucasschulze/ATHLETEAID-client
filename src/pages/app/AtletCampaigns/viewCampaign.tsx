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
      numero_time: resultViewCampaign?.numero_time ?? 0,
      meta_arrecadacao: resultViewCampaign?.meta_arrecadacao ?? 0,
      valor_arrecadado: resultViewCampaign?.valor_arrecadado ?? 0,
      conta_destino: resultViewCampaign?.conta_destino ?? ''
    },
  })
  const { reset } = form

  const { mutateAsync: updateCampaignFn } = useMutation({
    mutationFn: updateCampaign,
    onSuccess(
      _,
      { titulo, descricao, numero_time, meta_arrecadacao, valor_arrecadado, conta_destino },
    ) {
      queryClient.setQueryData(['campaigns', idCampaign], {
        titulo,
        descricao,
        numero_time,
        meta_arrecadacao,
        valor_arrecadado,
        conta_destino
      })
    },
  })

  async function handleUpdateCampagin(data: UpdateCampaignFormSchema) {
    try {
      await updateCampaignFn({
        id: idCampaign,
        titulo: data.titulo,
        descricao: data.descricao,
        numero_time: data.numero_time,
        meta_arrecadacao: data.meta_arrecadacao,
        valor_arrecadado: data.valor_arrecadado,
        conta_destino: data.conta_destino
      })

      toast.success('Campanha atualizado com Sucesso')
      setOpenModal(false)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto max-w-4xl border bg-card px-4 py-8 text-card-foreground shadow-xl">
      <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-lg  shadow-md md:grid-cols-2">
        <div className="p-6">
          <h2 className="text-justify text-2xl font-semibold ">
            {resultViewCampaign?.titulo}
          </h2>
          <h2 className="mt-10 text-xl font-bold ">Descrição:</h2>
          <p className="mt-5 text-base ">{resultViewCampaign?.descricao}</p>
          <div className="mt-4 space-y-5">
            <p className="text-xl font-medium ">
              <strong>Meta Arrecadação: </strong>
              {resultViewCampaign?.meta_arrecadacao}
              {/* {resultViewCampaign?.meta_arrecadacao.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })} */}
            </p>
            <p className="text-xl font-medium ">
              <strong>Valor Arrecadado: </strong>
              {resultViewCampaign?.valor_arrecadado}
            </p>
            <p className="text-sm text-foreground">
              {resultViewCampaign?.created_at &&
                formatDistanceToNow(resultViewCampaign.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
            </p>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild>
                <Button className="mb-4" variant="default">
                  Editar Campanha
                </Button>
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
                        Número do Time <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="numero_time"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl>
                              <Textarea
                                id="numero_time"
                                required
                                placeholder="Digite sua Número do Time"
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
                        Meta de Arrecadação <span className="text-red-500">*</span>
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
                        Valor de arrecadação <span className="text-red-500">*</span>
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
                        Conta de Destino <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="conta_destino"
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl>
                              <Input
                                id="conta_destino"
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
