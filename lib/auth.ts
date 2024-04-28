import api, { csrf }  from '@/lib/axios';
import axios from "axios"

import Router from 'next/router';
import { destroyCookie } from "nookies";

type SignInRequestData = {
    email: string;
    password: string;
}

export const signInRequest = async (args: SignInRequestData) => {
    const {...props } = args
    await csrf()
    const response = await api.post('/api/login', props)
    return {
        user: response.data.data,
        token: response.data.acces_token
    };
}

export async function signOutRequest(token: string) {
    try {
    const endpoint = 'http://127.0.0.1:8000/api/logout'
    const response = await api.get(endpoint);
    
    console.log(response.status)
    if(response.status === 200){
        destroyCookie(undefined, 'sgfa.token')
        Router.push('/');
    }
        
    } catch (error) {
        // Handle error
        throw error;
    }
}
/*

export async function recoverUserInformation() {
    const baseURL = 'api/user';    
    try {
        const response = await api.get(baseURL);
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
}


export async function signInRequest_old({email,password}: SignInRequestData){
    const endpoint = '/api/login'
    try {
        const response = await api.post(endpoint, { email, password });
        
        return {
            user: response.data.data,
            token: response.data.acces_token
        };
    } catch (error) {
        // Handle error
        throw error;
    }
}
*/
