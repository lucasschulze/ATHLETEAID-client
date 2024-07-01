import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardImageProps extends ComponentProps<'img'> {
  alt?: string
}

export function CardImage({ className, alt, ...props }: CardImageProps) {
  return (
    <img
      className={twMerge('h-44 w-full rounded-t-xl object-cover', className)}
      alt={alt}
      {...props}
    />
  )
}
