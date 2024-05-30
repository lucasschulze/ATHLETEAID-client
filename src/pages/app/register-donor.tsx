import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerDonorFormSchema } from '@/schemas/registerDonorFormSchema'

export type RegisterDonorFormSchema = z.infer<typeof registerDonorFormSchema>

type Status = 'register' | 'loading'

const statusMessages = {
  register: 'Cadastrar',
  loading: 'Carregando...',
}

export function RegisterDonor() {
  const [status, setStatus] = useState<Status>('register')
  const navigate = useNavigate()

  const form = useForm<RegisterDonorFormSchema>({
    resolver: zodResolver(registerDonorFormSchema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form

  async function handleRegisterDonor(data: RegisterDonorFormSchema) {
    try {
      setStatus('loading')

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(`Cadastro Efetuado por ${data?.name}`, {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })

      setStatus('register')

      reset()
    } catch {
      toast.error(`Erro ao cadastrar Doador`)
    }
  }

  return (
    <>
      <Helmet title="Cadastro de Doação" />
      <div className="flex w-[450px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Cadastrar Doador
          </h1>
          <p className="text-sm text-muted-foreground">
            Faça sua doação na nossa plataforma
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleRegisterDonor)}
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                {...register('name')}
              />
              <span className="text-sm text-red-600">
                {errors.name?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register('email')}
                autoComplete="username"
              />
              <span className="text-sm text-red-600">
                {errors.email?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="passwor"
                type="password"
                placeholder="Digite sua senha"
                {...register('password')}
                autoComplete="current-password"
              />
              <span className="text-sm text-red-600">
                {errors.password?.message}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Digite seu Telefone"
                {...register('phone')}
              />
              <span className="text-sm text-red-600">
                {errors.phone?.message}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              type="address"
              placeholder="Digite seu Endereço"
              {...register('address')}
            />
            <span className="text-sm text-red-600">
              {errors.address?.message}
            </span>
          </div>

          <Button
            disabled={status !== 'register'}
            className="w-full"
            type="submit"
          >
            {status === 'register' ? 'Cadastrar' : statusMessages[status]}
          </Button>
        </form>
      </div>
    </>
  )
}
