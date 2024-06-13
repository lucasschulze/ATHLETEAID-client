import { zodResolver } from '@hookform/resolvers/zod'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useMask } from '@react-input/mask'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { paymentDonorCampaign } from '@/api/payment-donor'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { paymentDonorFormSchema } from '@/schemas/paymentDonorFormSchema'

export type PaymentCampaignFormSchema = z.infer<typeof paymentDonorFormSchema>

export function PaymentDonor() {
  initMercadoPago(`${import.meta.env.VITE_PUBLIC_KEY}`)

  const [paymentUrl, setPaymentUrl] = useState(null)

  const inputCPF = useMask({
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  })

  const form = useForm<PaymentCampaignFormSchema>({
    resolver: zodResolver(paymentDonorFormSchema),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      valor: 0,
    },
  })
  const { reset } = form

  const { mutateAsync: paymentDonorCampaignFn } = useMutation({
    mutationFn: paymentDonorCampaign,
  })

  async function handlePaymentCampaign(data: PaymentCampaignFormSchema) {
    try {
      await paymentDonorCampaignFn(
        {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          valor: data.valor,
        },
        {
          onSuccess: (data) => {
            setPaymentUrl(data.url)
            toast.success('Pagamento cadastro com sucesso')
            reset()
          },
        },
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Helmet title="Método de Pagamento" />
      <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col lg:flex-row">
          <div className="mb-8 w-full lg:mb-0 lg:mr-4 lg:w-1/2">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="px-6 py-4">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                  Checkout
                </h2>
                <Form {...form}>
                  <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(handlePaymentCampaign)}
                  >
                    <div>
                      <FormLabel className="mb-2 block text-sm font-bold text-gray-700">
                        Nome <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="nome"
                                type="text"
                                required
                                placeholder="Digite seu Nome"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel className="mb-2 block text-sm font-bold text-gray-700">
                        E-mail <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                required
                                placeholder="Digite seu E-mail"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-2">
                      <FormLabel className="mb-2 block text-sm font-bold text-gray-700">
                        CPF <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="nome"
                                type="cpf"
                                required
                                placeholder="Digite seu CPF"
                                {...field}
                                ref={inputCPF}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-2">
                      <FormLabel className="mb-2 block text-sm font-bold text-gray-700">
                        Valor <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="valor"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                id="valor"
                                type="number"
                                required
                                placeholder="Digite o valor"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <Button className="focus:shadow-outline w-full bg-red-500 hover:bg-red-600 focus:outline-none">
                        Enviar Dados
                      </Button>
                    </div>
                    {paymentUrl && (
                      <Wallet
                        initialization={{
                          preferenceId: paymentUrl,
                        }}
                      />
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
