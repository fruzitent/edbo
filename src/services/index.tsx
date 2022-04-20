import React from 'react'

interface IServices {}

const ServicesContext = React.createContext<IServices>(null as any)

export const useServices = () => React.useContext(ServicesContext)

interface ServicesContextProps extends IServices {
  children: React.ReactNode
}

export const ServicesContextProvider = (
  props: ServicesContextProps,
): React.ReactElement => {
  const { children, ...services } = props
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  )
}
