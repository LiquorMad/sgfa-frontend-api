import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'; 
import { recoverUserInformation, signInRequest } from "@/lib/auth";
import { useRouter } from "next/router";
import api from "@/lib/axios";

type User = {
    name: string,
    email: string,
    password: string
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User
    signIn: (data:SignInData) => Promise<void>
}

type SignInData = {
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }:any){

    const [user, setUser] = useState<User | any>()
    const router = useRouter();
    const isAuthenticated = !!user; 

    useEffect(() => {
        const { 'sgfa.token': token } = parseCookies()
        if(token){
            recoverUserInformation(token).then(response => {
                setUser(response)
            })
        }
    },[])
    
   
    async function signIn({email,password}:SignInData){
        const {token, user} = await signInRequest({
            email,
            password
        });
        setCookie(undefined, 'sgfa.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })
        api.defaults.headers['Authorization'] = 'Bearer ' + token;
        setUser(user)
        router.push('dashboard');
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated,signIn }}>
            {children}
        </AuthContext.Provider>
    )
}