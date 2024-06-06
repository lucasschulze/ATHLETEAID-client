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
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      age: '',
      gender: '',
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
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
      })

      toast.success(`Cadastro Efetuado com Sucesso`, {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data?.email}`),
        },
      })

      setStatus('register')

      reset()
    } catch {
      toast.error(`Erro ao cadastrar Doador`)
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="password"
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
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="age"
                          type="age"
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="gender"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="phone"
                          type="phone"
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
            <div className="space-y-2">
              <FormLabel>
                Endereço <span className="text-red-500">*</span>
              </FormLabel>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="address"
                        type="address"
                        required
                        placeholder="Digite seu Endereço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
