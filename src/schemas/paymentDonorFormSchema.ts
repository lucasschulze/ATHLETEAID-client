import { z } from 'zod'

export const paymentDonorFormSchema = z.object({
  nome: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  email: z.string().email({ message: 'E-mail Inválido' }),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato: 999.999.999-99'),
  valor: z.coerce.number(),
})
