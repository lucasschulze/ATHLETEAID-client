import { z } from 'zod'

export const registerAthleteFormSchema = z.object({
  name: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
  address: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato: (99) 99999-9999'),
  age: z.string().min(1, { message: 'A idade deve ser maior que 0' }),
  gender: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
})
