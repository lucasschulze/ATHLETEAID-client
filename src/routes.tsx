import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { RegisterLayout } from './pages/_layouts/register'
import { NotFound } from './pages/404'
import { Campaign } from './pages/app/Campaigns/campaign'
import { ViewCampaign } from './pages/app/Campaigns/viewCampaign'
// import { PaymentDonor } from './pages/app/Donor/payment-donor'
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
    element: <RegisterLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <RegisterDonor /> },
      { path: '/registro-atleta', element: <ResgiterAthlete /> },
      { path: '/login', element: <SignIn /> },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/campanhas', element: <Campaign /> },
      { path: '/campanha/:id', element: <ViewCampaign /> },
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
    path: '*',
    element: <NotFound />,
  },
])
