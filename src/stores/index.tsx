import React from 'react'

interface IStores {}

const StoresContext = React.createContext<IStores>(null as any)

export const useStores = () => React.useContext(StoresContext)

interface StoresContextProps extends IStores {
  children: React.ReactNode
}

export const StoresContextProvider = (
  props: StoresContextProps,
): React.ReactElement => {
  const { children, ...stores } = props
  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  )
}
