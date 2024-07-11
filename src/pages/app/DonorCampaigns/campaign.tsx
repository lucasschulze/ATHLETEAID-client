import { useQuery } from '@tanstack/react-query'

import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Pagination } from '@/components/pagination'

import { ListCampaign } from './list-campaign'
import { getCampaignDonor } from '@/api/get-campaign-donor'

export function CampaignDonor() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageIndex = z.coerce
    .number()
    .transform((page) => page + 0)
    .parse(searchParams.get('page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['campaigns', pageIndex],
    queryFn: () => getCampaignDonor({ pageIndex }),
    staleTime: 100, // 10 segundos
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

  return (
    <>
      <Helmet title="Campanhas" />
      <div className="px-4 py-1">
        <h1 className="mb-4 text-3xl font-bold">Campanhas</h1>
       

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result?.campanhas && result?.campanhas.map((campanhas) => {
            return <ListCampaign key={campanhas.id} campanhas={campanhas} />
          })}
        </div>
        {result && (
          <Pagination
            onPageChange={handlePaginate}
            indiceDaPagina={result.meta?.indiceDaPagina}
            totalCampanha={result.meta?.totalCampanhas}
            itemsPorPagina={result.meta?.itemsPorPagina}
          />
        )}
      </div>
    </>
  )
}
