import { getUserAtleta } from "@/api/get-user-atleta";
import { updateAtletaId } from "@/api/update-atleta-id";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { updateAtletaIdFormSchema } from "@/schemas/updateAtletaIdFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { format } from 'date-fns';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type UpdateAtletaFormSchema = z.infer<typeof updateAtletaIdFormSchema>

export function TableUser() {
    const [openModal, setOpenModal] = useState(false)
    const params = useParams()
    const idCampaign = z.coerce.number().parse(params.id)

    const { data: user } = useQuery({
        queryKey: ['user', idCampaign],
        queryFn: getUserAtleta
    })

    const form = useForm<UpdateAtletaFormSchema>({
        resolver: zodResolver(updateAtletaIdFormSchema),
        values: {
          nome: user?.nome ?? '',
          genero: user?.genero ?? '',
          nascimento: user?.nascimento ?? '',
          telefone: user?.telefone ?? '',
          email: user?.email ?? '',
          senha: user?.senha ?? ''
        },
      })
      const { reset } = form

      const { mutateAsync: updateCampaignFn } = useMutation({
        mutationFn: updateAtletaId,
        onSuccess(
          _,
          { nome, genero, nascimento, telefone, email, senha },
        ) {
          queryClient.setQueryData(['user', idCampaign], {
            nome,
            genero,
            nascimento,
            telefone,
            email,
            senha
          })
        },
      })

      async function handleUpdateAtleta(data: UpdateAtletaFormSchema) {
        try {
          await updateCampaignFn({
            id: idCampaign,
            nome: data.nome,
            genero: data.genero,
            nascimento: data.nascimento,
            telefone: data.telefone,
            email: data.email,
            senha: data.senha
          })
    
          toast.success('Atleta atualizado com Sucesso')
          setOpenModal(false)
          reset()
        } catch (error) {
          console.log(error)
        }
      }
    

    const formattedDate = user?.nascimento ? format(new Date(user.nascimento), 'dd/MM/yyyy') : '';

    return (
        <div className="p-5">
            <h1 className="text-2xl font-medium text-muted-foreground pb-10">Informações do Usuários</h1>
            <Table> 
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead className="w-[200px]">Data de Nascimento</TableHead>
                <TableHead className="w-[100px]">Telefone</TableHead>
                <TableHead className="w-[100px]">E-mail</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{user?.id}</TableCell>
                  <TableCell>{user?.nome}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{user?.telefone}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>


                  <Dialog open={openModal} onOpenChange={setOpenModal} >
                    <DialogTrigger asChild>
                        <Button>Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Atualizar</DialogTitle>
                        <DialogDescription>Atualizar Atleta</DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(handleUpdateAtleta)}
                        >
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Nome <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="nome"
                                        type="text"
                                        required
                                        className="col-span-3"
                                        placeholder="Digite seu Nome"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Genero <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="genero"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="genero"
                                        type="text"
                                        required
                                        className="col-span-3"
                                        placeholder="Digite seu Genero"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>

                            
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Nascimento<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="nascimento"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="nascimento"
                                        type="text"
                                        required
                                        placeholder="Digite seu nascimento"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>

                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Telefone <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="telefone"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="telefone"
                                        type="text"
                                        required
                                        placeholder="Digite seu Telefone"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>

                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Email: <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
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

                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                Senha: <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="senha"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="senha"
                                        type="password"
                                        required
                                        placeholder="Digite sua Senha"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            </div>

                            <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                            </DialogFooter>
                        </form>
                        </Form>
                    </DialogContent>


                  </Dialog>

                    
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
    )
}