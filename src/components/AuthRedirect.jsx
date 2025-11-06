'use client'

// Next Imports
import { redirect, usePathname } from 'next/navigation'

const AuthRedirect = () => {
  const pathname = usePathname()

  // ℹ️ Bring me `lang`
  const redirectUrl = `/esse-panel/login?redirectTo=${pathname}`
  const login = `/esse-panel/login`

  return redirect(pathname ? redirectUrl : login)
}

export default AuthRedirect
