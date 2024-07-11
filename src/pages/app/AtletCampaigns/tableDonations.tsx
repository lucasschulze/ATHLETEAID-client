import { getHistoricoAtleta } from "@/api/get-historico-doacoes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

export function TableDonations() {
    const { data: resultHistoricoAtleta } = useQuery({
        queryKey: ['doacoes'],
        queryFn: getHistoricoAtleta
    });

    return (
        <div className="p-5">
            <h1 className="text-2xl font-medium text-muted-foreground pb-10">Listagem de Doações</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead className="w-[200px]">Título da Campanha</TableHead>
                        <TableHead className="w-[200px]">Nome do Doador</TableHead>
                        <TableHead className="w-[200px]">Valor da Doação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resultHistoricoAtleta?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.campanha_id}</TableCell>
                            <TableCell>{item.campanha_titulo}</TableCell>
                            <TableCell>{item.doador_nome}</TableCell>
                            <TableCell>{item.valor.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
