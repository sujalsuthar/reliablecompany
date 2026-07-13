'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface NavOverlayContextValue {
  overlayActive: boolean
  setServicesMenuOpen: (open: boolean) => void
  setMobileNavOpen: (open: boolean) => void
}

const NavOverlayContext = createContext<NavOverlayContextValue | null>(null)

function noopSetOpen() {
  /* used when NavOverlayProvider is not mounted */
}

export function NavOverlayProvider({ children }: { children: ReactNode }) {
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const overlayActive = servicesMenuOpen || mobileNavOpen

  const value = useMemo(
    () => ({
      overlayActive,
      setServicesMenuOpen,
      setMobileNavOpen,
    }),
    [overlayActive],
  )

  return <NavOverlayContext.Provider value={value}>{children}</NavOverlayContext.Provider>
}

export function useNavOverlay() {
  const ctx = useContext(NavOverlayContext)
  if (!ctx) {
    return {
      overlayActive: false,
      setServicesMenuOpen: noopSetOpen,
      setMobileNavOpen: noopSetOpen,
    }
  }
  return ctx
}
