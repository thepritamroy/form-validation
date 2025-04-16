import { ReactNode,createContext, useContext, useEffect, useState } from "react"

interface AUTH {
  user : string,
  pwd : string,
  accessToken: string,
  roles : string[]
}
interface USEAUTH{
  auth : AUTH,
  setAuth : React.Dispatch<React.SetStateAction<AUTH>>
}

const initialAuth = {
  user : '',
  pwd : '',
  accessToken : '',
  roles : []
}

const authContext = createContext<USEAUTH | null>(null)

const AuthProvider = ({children}:{children:ReactNode}) => {
  const [auth , setAuth] =  useState<AUTH>(JSON.parse(localStorage.getItem('auth') || 'null') || initialAuth );

 useEffect(()=>{
  localStorage.setItem('auth',JSON.stringify(auth));
 },[auth])
  return (
    <authContext.Provider value={{auth,setAuth}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider


export const useAuth = ()=>{
  return useContext(authContext) as USEAUTH;
}
