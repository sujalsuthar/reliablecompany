'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  name?: string
}

interface State {
  hasError: boolean
}

/** Keeps the rest of the homepage visible if one section crashes. */
export default class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error(`[homepage] section failed${this.props.name ? ` (${this.props.name})` : ''}:`, error)
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
