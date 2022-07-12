import {createContext, ReactNode, useState} from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setLoading] = useState(null);


}