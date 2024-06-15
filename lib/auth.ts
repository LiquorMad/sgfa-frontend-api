import api, { csrf }  from '@/lib/axios';

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
        const endpoint = 'http://localhost:8000/api/logout'
        
        const response = await api.post('api/logout',{
            headers:{
            },
        });
    if(response.status === 200){
        destroyCookie(undefined, 'sgfa.token')
        Router.push('/');
    }
    } catch (error) {
        // Handle error
        throw error;
    }
}

export async function recoverUserInformation(token: string) {
    const baseURL = 'api/recoveryUserInformation';
    try {
        const response = await api.get(baseURL,{
            headers: {
              Authorization: 'Bearer '+token
            }
          });
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
}