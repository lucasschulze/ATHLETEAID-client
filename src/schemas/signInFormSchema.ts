import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  senha: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
})
