import {
  CardNumber,
  initMercadoPago,
  SecurityCode,
  Wallet,
} from '@mercadopago/sdk-react'
import { Helmet } from 'react-helmet-async'

export function PaymentDonor() {
  initMercadoPago(`${import.meta.env.VITE_PUBLIC_KEY}`)

  return (
    <>
      <Helmet title="Método de Pagamento" />
      <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md">
          <div className="px-6 py-4">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Checkout
            </h2>
            <form>
              <div className="">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="cardNumber"
                >
                  Número do Cartão
                </label>
                <CardNumber placeholder="NÚMERO DO CARTÃO" />
              </div>
              <div className="mb-2">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="securityCode"
                >
                  Código de Segurança
                </label>
                <SecurityCode placeholder="CVC" />
              </div>
              <div className="mb-4">
                <Wallet
                  initialization={{ preferenceId: '' }}
                  customization={{ texts: { valueProp: 'smart_option' } }}
                />
              </div>
              {/* <Button className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none">
                Pagar
              </Button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
