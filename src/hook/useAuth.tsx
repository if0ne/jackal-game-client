import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import useAxios from "./useAxios";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    const {setTokenHeader, getRequest, postRequest} = useAxios();

    useEffect(() => {
        let token = localStorage.getItem("token");
        setToken(token);
        setTokenHeader(token);
    }, []);

    useEffect(() => {
        setLoading(true);
    }, [token]);

    const value = {

    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}