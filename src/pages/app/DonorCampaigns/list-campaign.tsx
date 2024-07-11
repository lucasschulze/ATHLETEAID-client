import { z } from 'zod'

import { Card } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { paymentDoadoFormSchema } from '@/schemas/paymentDoador'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { paymentDonor } from '@/api/paymentDonor'
import { queryClient } from '@/lib/react-query'
import { toast } from 'sonner'

export type PaymentDoadoFormSchema = z.infer<typeof paymentDoadoFormSchema>

export interface CampaignProps {
  campanhas: {
    id: number
    titulo: string
    descricao: string
    numero_time: number
    meta_arrecadacao: number
    valor_arrecadado: number
    conta_destino: string
    atleta_id: number
    created_at: string
  }
}

// const form = useForm<PaymentDoadoFormSchema>({
//   resolver: zodResolver(paymentDoadoFormSchema),
//   defaultValues: {
//     valor: 0,
//     campaign_id: 0
//   },
// })
// const { reset } = form


// const { mutateAsync: createCampaignFn } = useMutation({
//   mutationFn: paymentDonor,
//   onSuccess() {
//     queryClient.invalidateQueries({ queryKey: ['payment-donor'] })
//   },
// })

// async function handleCreateCampaign(data: PaymentDoadoFormSchema) {
//   try {
//     await createCampaignFn({
//       valor: data.valor,
//       campaign_id: data.campaign_id
//     })

//     toast.success('Campanha cadastro com sucesso')
//     reset()
//   } catch (error) {
//     console.log(error)
//   }
// }

export function ListCampaign({ campanhas }: CampaignProps) {
  return (
    <>
      <Card.Root>
        <Card.Image
          src="https://www.ceara.gov.br/wp-content/uploads/2021/06/esej.jpeg"
          alt="Imagem Campanha"
        />
        <Card.Content
          textTitle={campanhas.titulo}
          textDescription={campanhas.descricao}
          textCreatedAt={campanhas.created_at}
          textCurrency={campanhas.meta_arrecadacao}
        />
        <div className="pb-4 pl-4 pr-2">
      <div className="flex w-full items-center justify-between">
        <div>
        </div>
        <div className="flex gap-2 ">
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="default">
                Doar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Realizar Doação</DialogTitle>
                <DialogDescription className="text-base">
                  Fazer Doação
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(handleCreateCampaign)}
                        >
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Nome <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="valor"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="valor"
                                        type="number"
                                        required
                                        className="col-span-3"
                                        placeholder="Digite seu Nome"
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
                                Campanha <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="campaign_id"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="campaign_id"
                                        type="number"
                                        required
                                        className="col-span-3"
                                        placeholder="Digite seu Nome"
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
          </Dialog> */}
        </div>
      </div>
    </div>
      </Card.Root>
    </>
  )
}
