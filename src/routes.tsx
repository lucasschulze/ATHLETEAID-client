import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { ResgiterAthlete } from './pages/auth/register-athlete'
import { RegisterDonor } from './pages/auth/register-donor'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <RegisterDonor /> }],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/register-athlete', element: <ResgiterAthlete /> }],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
