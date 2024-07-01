import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CardContetProps {
  textTitle: string
  textDescrition: string
  textCreatedAt: string
  textCurrent: number
}

export function CardContent({
  textTitle,
  textDescrition,
  textCreatedAt,
  textCurrent,
}: CardContetProps) {
  return (
    <div className="flex flex-col p-[0.8rem]">
      <h2 className="mt-1 truncate text-xl font-bold">{textTitle}</h2>
      <p className="mb-2 line-clamp-1 block truncate text-sm text-muted-foreground">
        {textDescrition}
      </p>
      <h3 className="mb-2 text-sm ">
        <strong className="font-bold text-muted-foreground">
          Meta de Arrecadação:{' '}
        </strong>{' '}
        {textCurrent.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h3>
      <h3 className="mb-2 text-sm text-muted-foreground">
        {formatDistanceToNow(textCreatedAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </h3>
    </div>
  )
}
