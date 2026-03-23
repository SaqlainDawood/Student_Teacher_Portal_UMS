
import { useState } from "react";
import { Children } from "react";
import { createContext , react } from "react";

export const AuthConext = createContext();

export const AuthProvider = ({Children})=>{
    const [faculty , setFaculty] = useState(null);
    return (
        <AuthConext.Provider value={{faculty , setFaculty}}>
            {Children}
        </AuthConext.Provider>
    )
}