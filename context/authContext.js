import { createContext, useContext, useEffect, useState } from "react"

export const authContext = createContext()

export const authContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setItAuthenticated] = useState(undefined);

    useEffect(()=>{
        //onauthstatechange 

        // setTimeout(() => {
        setItAuthenticated(false)
        // }, 3000);
    },[])

    const login = async (email, password )=>{
        try{

        }
        catch(e){

        }
    }
    const logout = async ()=>{
        try{

        }
        catch(e){
            
        }
    }
    const register = async (email, password,username, profileURL)=>{
        try{

        }
        catch(e){
            
        }
    }
    return(
        <authContext.Provider value ={{user, isAuthenticated,login,register,logout}}>
            {children}
        </authContext.Provider>
    )
}

export const useAult =()=>{
    const value = useContext(authContext);

    if(!value){
        throw new Error('useAult must be wrapped inside authcontextprovider')
    }
    return value;
}
