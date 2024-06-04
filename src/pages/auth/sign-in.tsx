import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { signInFormSchema } from '@/schemas/signInFormSchema'

export type SignInFormSchema = z.infer<typeof signInFormSchema>

type Status = 'signIn' | 'loading'

const statusMessages = {
  signIn: 'Login',
  loading: 'Carregando...',
}

export function SignIn() {
  const [status, setStatus] = useState<Status>('signIn')

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { reset } = form

  async function handleRegisterDonor(data: SignInFormSchema) {
    try {
      setStatus('loading')

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(`Login Efetuado com Sucesso ${data?.email}`)

      setStatus('signIn')

      reset()
    } catch {
      toast.error(`Erro ao Realizar Login`)
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex w-[450px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem-vindo de Volta!
          </h1>
          <p className="text-sm text-muted-foreground">
            Faça seu login na plataforma
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleRegisterDonor)}
          >
            <div className="space-y-2">
              <FormLabel>
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
                        placeholder="Digite seu e-mail"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="relative space-y-2">
              <FormLabel>
                Senha <span className="text-red-500">*</span>
              </FormLabel>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={status !== 'signIn'}
              className="w-full"
              type="submit"
            >
              {status === 'signIn' ? 'Entrar' : statusMessages[status]}
            </Button>
          </form>
        </Form>
        <Button className="w-full" variant="secondary">
          Cadastrar
        </Button>
      </div>
      {/* <img src={`data:image/jpeg;base64`} /> */}
    </>
  )
}
