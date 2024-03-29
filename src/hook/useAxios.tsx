import axios from 'axios';
import {createContext, ReactNode, useContext} from "react";

export const AxiosContext = createContext<any>(null);

export const AxiosProvider = ({children}: {children: ReactNode}) => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_ENTERPRISE_URL,
    });

    const setTokenHeader = (token: string) => {
       axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const getRequest = (route: string, body: any) => {
        return axiosInstance.get(route, body);
    }

    const postRequest = (route: string, body: any) => {
        return axiosInstance.post(route, body);
    }

    const value = {
        setTokenHeader,
        getRequest,
        postRequest
    };

    return <AxiosContext.Provider value={value}>
        {children}
    </AxiosContext.Provider>;
}

export function useAxios() {
    return useContext(AxiosContext);
}
