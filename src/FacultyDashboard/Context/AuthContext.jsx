
import { useState } from "react";
import { createContext , react } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [faculty , setFaculty] = useState(null);
    return (
        <AuthContext.Provider value={{faculty , setFaculty}}>
            {children}
        </AuthContext.Provider>
    )
}