import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Campaign } from './pages/app/Campaigns/campaign'
import { PaymentDonor } from './pages/app/Donor/payment-donor'
import { Failure } from './pages/app/StatusPayment/failure'
import { Peding } from './pages/app/StatusPayment/pending'
import { Success } from './pages/app/StatusPayment/success'
import { ResgiterAthlete } from './pages/auth/register-athlete'
import { RegisterDonor } from './pages/auth/register-donor'
import { SignIn } from './pages/auth/sign-in'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <RegisterDonor /> },
      { path: '/registro-atleta', element: <ResgiterAthlete /> },
      { path: '/login', element: <SignIn /> },
    ],
  },
  {
    path: '/',
    children: [
      { path: '/sucesso', element: <Success /> },
      { path: '/pendente', element: <Peding /> },
      { path: '/falha', element: <Failure /> },
    ],
  },
  {
    path: '/campanhas',
    element: <Campaign />,
  },
  {
    path: '/pagamento',
    element: <PaymentDonor />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
