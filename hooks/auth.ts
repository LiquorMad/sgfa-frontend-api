import useSWR from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from "react";


declare type AuthMiddleware = 'auth' | 'guest'

interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string
}

interface IApiRequest {
    setErrors: React.Dispatch<React.SetStateAction<never[]>>
    setStatus: React.Dispatch<React.SetStateAction<any | null>>
    [key: string]: any
}

export interface User {
    id?: number
    name?: string
    email?: string
    email_verified_at?: string
    must_verify_email?: boolean // this is custom attribute
    created_at?: string
    updated_at?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()
    
    const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async (args: IApiRequest) => {
        const { setErrors, ...props } = args

        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }
/*
    const login = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args
        setErrors([])
        setStatus(null)        
        axios
            .post('api/login', props,
            )
            .then(response => {
                // Here, you can access the response data
                console.log(response.data.acces_token);
                // You might want to do something else with the data, such as updating state
                // Example:
                // setData(response.data);
                //mutate(); // Call mutate function after successful request
            })
            /*.catch(error => {
                if (error.response.status !== 422) throw error;
                // Handle errors here
                setErrors(error.response.data.errors);
            });
    }
*/
    const forgotPassword = async (args: IApiRequest) => {
        const { setErrors, setStatus, email } = args
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = (args: IApiRequest) => {
        const { setStatus } = args

        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout').then(() => mutate())
        }

        router.push('/');
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        //login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
