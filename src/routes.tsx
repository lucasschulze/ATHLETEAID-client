import { Route, Routes } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { RegisterLayout } from './pages/_layouts/register'
import { NotFound } from './pages/404'
import { Campaign } from './pages/app/AtletCampaigns/campaign'
import { ViewCampaign } from './pages/app/AtletCampaigns/viewCampaign'
// import { PaymentDonor } from './pages/app/Donor/payment-donor'
// import { Failure } from './pages/app/StatusPayment/failure'
// import { Peding } from './pages/app/StatusPayment/pending'
// import { Success } from './pages/app/StatusPayment/success'
import { ResgiterAthlete } from './pages/auth/register-athlete'
import { RegisterDonor } from './pages/auth/register-donor'
import { SignIn } from './pages/auth/sign-in'
import { ProtectedLayout } from './pages/Context/protected-layout'
import { Error } from './pages/error'
import { TableUser } from './pages/app/AtletCampaigns/tableUser'
import { TableDonations } from './pages/app/AtletCampaigns/tableDonations'
import { CampaignDonor } from './pages/app/DonorCampaigns/campaign'
import { TableUserDonor } from './pages/app/DonorCampaigns/tableUser'

export function Router() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      <Route element={<RegisterLayout />} errorElement={<Error />}>
        <Route path="registro-donor" element={<RegisterDonor />} />
        <Route path="registro-atleta" element={<ResgiterAthlete />} />
        <Route path="login" element={<SignIn />} />
      </Route>

      <Route
        element={
          <ProtectedLayout>
            <AppLayout />
          </ProtectedLayout>
        }
      >
        <Route path="campanhas" element={<Campaign />} />
        <Route path="campanha/:id" element={<ViewCampaign />} />
        <Route path="user/:id" element={<TableUser />} />
        <Route path="tabela-doacoes" element={<TableDonations />} />
      </Route>
      
      <Route
        element={
          <ProtectedLayout>
            <AppLayout />
          </ProtectedLayout>
        }
      >
        <Route path="campanha-donor" element={<CampaignDonor />} />
        <Route path="user-donor/:id" element={<TableUserDonor />} />
      </Route>
    </Routes>
  )
}
