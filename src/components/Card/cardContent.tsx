import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CardContetProps {
  textTitle: string
  textDescription: string
  textCreatedAt: string
  textCurrency: number
}

export function CardContent({
  textTitle,
  textDescription,
  textCreatedAt,
  textCurrency,
}: CardContetProps) {
  return (
    <div className="flex flex-col p-[0.8rem]">
      <h2 className="mt-1 truncate text-xl font-bold">{textTitle}</h2>
      <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
        {textDescription}
      </p>
      <h3 className="mb-2 text-sm ">
        <strong className="font-bold text-muted-foreground">
          Meta de Arrecadação:{' '}
        </strong>{' '}
        {textCurrency.toLocaleString('pt-BR', {
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
