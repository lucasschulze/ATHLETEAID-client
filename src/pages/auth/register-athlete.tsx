import { zodResolver } from '@hookform/resolvers/zod'
import { useMask } from '@react-input/mask'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerAthlete } from '@/api/registerAthlete'
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
import { registerAthleteFormSchema } from '@/schemas/registerAthleteFormSchema'

export type RegisterAthleteFormSchema = z.infer<
  typeof registerAthleteFormSchema
>

type Status = 'register' | 'loading'

const statusMessages = {
  register: 'Cadastrar',
  loading: 'Carregando...',
}

export function ResgiterAthlete() {
  const [status, setStatus] = useState<Status>('register')
  const navigate = useNavigate()
  const inputTel = useMask({
    mask: '(__) _____-____',
    replacement: { _: /\d/ },
  })
  const inputDateOfBirth = useMask({
    mask: '__/__/____',
    replacement: { _: /\d/ },
  })

  const form = useForm<RegisterAthleteFormSchema>({
    resolver: zodResolver(registerAthleteFormSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      nascimento: '',
      genero: '',
    },
  })
  const { reset } = form

  const { mutateAsync: registerAthleteFn } = useMutation({
    mutationFn: registerAthlete,
  })

  async function handleRegisterAthlete(data: RegisterAthleteFormSchema) {
    try {
      setStatus('loading')

      await registerAthleteFn({
        nome: data.nome,
        genero: data.genero,
        nascimento: data.nascimento,
        telefone: data.telefone,
        email: data.email,
        senha: data.senha,
      })

      toast.success(`Cadastro Efetuado com Sucesso`, {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data?.email}`),
        },
      })

      setStatus('register')

      reset()
    } catch (err) {
      toast.error(`Erro ao cadastrar Atleta`)
      setStatus('register')
    }
  }

  return (
    <>
      <Helmet title="Cadastro de Atleta" />
      <div className="flex w-[450px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Cadastrar Atleta
          </h1>
          <p className="text-sm text-muted-foreground">
            Crie suas campanhas na plataforma
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleRegisterAthlete)}
          >
            <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
              <div className="space-y-2">
                <FormLabel>
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
                          placeholder="Digite seu E-mail"
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
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="senha"
                          type="password"
                          required
                          placeholder="Digite sua Senha"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>
                  Data de Nascimento <span className="text-red-500">*</span>
                </FormLabel>
                <FormField
                  control={form.control}
                  name="nascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="nascimento"
                          type="nascimento"
                          required
                          placeholder="Digite sua Data de Nascimento"
                          {...field}
                          ref={inputDateOfBirth}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormLabel>
                  Gênero <span className="text-red-500">*</span>
                </FormLabel>
                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="genero"
                          type="text"
                          required
                          placeholder="Digite seu Gênero"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>
                  Telefone <span className="text-red-500">*</span>
                </FormLabel>
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="telefone"
                          type="tel"
                          required
                          placeholder="Digite seu Telefone"
                          {...field}
                          ref={inputTel}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              disabled={status !== 'register'}
              className="w-full"
              type="submit"
            >
              {status === 'register' ? 'Cadastrar' : statusMessages[status]}
            </Button>
          </form>
        </Form>

        <Button className="w-full" variant="secondary">
          Login
        </Button>
      </div>
    </>
  )
}
