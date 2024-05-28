import { createBrowserRouter } from 'react-router-dom'

import { RegisterDonor } from './pages/app/register-donor'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  { path: '/', element: <RegisterDonor /> },
  { path: '/sign-in', element: <SignIn /> },
])
