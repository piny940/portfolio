'use client'

import { useEffect } from 'react'

export const BootstrapClient: React.FC = () => {
  useEffect(() => {
    import('bootstrap')
  }, [])

  return null
}
