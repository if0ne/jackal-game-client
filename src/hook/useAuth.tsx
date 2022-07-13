import useAxios from "./useAxios";
import {getUserFromToken, GUEST_USER, User} from "../components/models/User";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User>(GUEST_USER);
    const [token, setToken] = useState<string | null>(null);

    const {setTokenHeader, getRequest, postRequest} = useAxios();

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        setToken(token);
        setTokenHeader(token);
    }, []);

    useEffect(() => {
        refreshUser();
    }, [token]);

    const setAuthTokens = (token: string, refreshToken: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setToken(token);
        setTokenHeader(token);
    }

    const refreshUser = () => {
        if (token) {
            setUser(getUserFromToken(token));
        } else {
            setUser(GUEST_USER);
        }
    }

    const refreshToken = async () => {

    }

    const authRequest = async (
        route: string,
        body: any,
        request: (route: string, body: any) => Promise<AxiosResponse<any, any>>
    ) => {
        let response = await request(route, body);
        if (response.status === 401) {
            await refreshToken();
            response = await request(route, body);
        }

        return response;
    }

    const signIn = async (accessToken: string, provider: string) => {
        let response = await postRequest(`/api/auth/${provider}`, {
           "accessToken": accessToken
        });

        if (response.data.responseStatus === "OK") {
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
            navigate("/");
        }

    };

    const logOut = (callback: () => void) => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setTokenHeader(null);

        callback();
        navigate("/");
    }

    const getAuthRequest = async (route: string, body: any) => {
        return authRequest(route, body, getRequest);
    }

    const postAuthRequest = async (route: string, body: any) => {
        return authRequest(route, body, postRequest);
    }

    const value = {
        user,
        signIn,
        logOut,
        getAuthRequest,
        postAuthRequest
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}