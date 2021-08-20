import { useState, useEffect, createContext, ReactNode } from 'react'

const DeviceContext = createContext('small')

const getSize = () => {
  if (window.innerWidth < 768) {
    return 'small'
  } else if (window.innerWidth < 1280) {
    return 'medium'
  } else {
    return 'large'
  }
}

type Props = {
  children: ReactNode
}

const DeviceProvider = ({ children }: Props) => {
  const [device, setDevice] = useState(getSize())

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setDevice(getSize())
    })
    const body = document.querySelector('body') as HTMLBodyElement
    observer.observe(body)

    return () => {
      observer.unobserve(body)
    }
  }, [device])

  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
}

export { DeviceContext, DeviceProvider }
