import { z } from 'zod'

export const donorAtualizacaoFormSchema = z.object({
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato: 999.999.999-99'),
  numConta: z.string().min(5, { message: 'Mínimo 5 caracteres' }).max(5, {message: 'Máximo 5 ca'}),
})
