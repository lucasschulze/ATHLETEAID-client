import { getUserDoador } from "@/api/get-user-doador";
import { updateDoacao } from "@/api/update-doador";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/react-query";
import { updateAtletaIdFormSchema } from "@/schemas/updateAtletaIdFormSchema";
import { donorAtualizacaoFormSchema } from "@/schemas/updateDonorPayment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { format } from 'date-fns';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type DonorAtualizacaoFormSchema = z.infer<typeof donorAtualizacaoFormSchema>

export function TableUserDonor() {
    const [openModal, setOpenModal] = useState(false)
    const params = useParams()
    const idCampaign = z.coerce.number().parse(params.id)

    const { data: userDonor } = useQuery({
        queryKey: ['user-donor', idCampaign],
        queryFn: getUserDoador
    })

    const form = useForm<DonorAtualizacaoFormSchema>({
        resolver: zodResolver(donorAtualizacaoFormSchema),
        values: {
          cpf: userDonor?.cpf ?? '',
          numConta: userDonor?.numConta ?? ''
        },
      })
      const { reset } = form

      const { mutateAsync: updateCampaignFn } = useMutation({
        mutationFn: updateDoacao,
        onSuccess(
          _,
          { cpf, numConta },
        ) {
            queryClient.setQueryData(['user', idCampaign], {
                cpf, numConta
              })
        },
        })

      async function handleUpdateDonorPayment(data: DonorAtualizacaoFormSchema) {
        try {
          await updateCampaignFn({
            cpf: data.cpf,
            numConta: data.numConta
          })
    
          toast.success('Dados atualizado com Sucesso')
          setOpenModal(false)
          reset()
        } catch (error) {
          console.log(error)
        }
      }
    

    const formattedDate = userDonor?.nascimento ? format(new Date(userDonor.nascimento), 'dd/MM/yyyy') : '';

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
                <TableHead className="w-[100px]">cpf</TableHead>
                <TableHead className="w-[00px]">numConta</TableHead>
                <TableHead className="w-[00px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{userDonor?.id}</TableCell>
                  <TableCell>{userDonor?.nome}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{userDonor?.telefone}</TableCell>
                  <TableCell>{userDonor?.email}</TableCell>
                  <TableCell>{userDonor?.cpf}</TableCell>
                  <TableCell>{userDonor?.numConta}</TableCell>
                  <TableCell>


                  <Dialog open={openModal} onOpenChange={setOpenModal} >
                    <DialogTrigger asChild>
                        <Button>Editar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Atualizar</DialogTitle>
                        <DialogDescription>Atualizar Dados do Doador</DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(handleUpdateDonorPayment)}
                        >
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                            <FormLabel>
                                cpf <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="cpf"
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
                                numConta <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormField
                                control={form.control}
                                name="numConta"
                                render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormControl>
                                    <Input
                                        id="numConta"
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