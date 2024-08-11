'use client'

import { AppStore, store } from '@/redux/store'
import { Provider } from 'react-redux'
import { useRef } from 'react'

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(store);

  return <Provider store={storeRef.current}>{children}</Provider>
}
