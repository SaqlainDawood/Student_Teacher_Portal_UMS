
import { useState } from "react";
import { Children } from "react";
import { createContext , react } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({Children})=>{
    const [faculty , setFaculty] = useState(null);
    return (
        <AuthContext.Provider value={{faculty , setFaculty}}>
            {Children}
        </AuthContext.Provider>
    )
}