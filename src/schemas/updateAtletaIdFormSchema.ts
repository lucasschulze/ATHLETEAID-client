import { z } from 'zod'

export const updateAtletaIdFormSchema = z.object({
  nome: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  genero: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  nascimento: z.string().min(4, { message: 'Mínimo 4 caracteres' }),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato: (99) 99999-9999'),
  email: z.string().email({ message: 'E-mail Inválido' }),
  senha: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e ter no mínimo 8 caracteres.',
  }),
})
