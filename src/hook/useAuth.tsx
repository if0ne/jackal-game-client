import {useAxios} from "./useAxios";
import {getUserFromToken, GUEST_USER, User} from "../components/models/User";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [initLoading, setInitLoading] = useState(true);

    const {setTokenHeader, getRequest, postRequest} = useAxios();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
        setTokenHeader(token);
        setInitLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);
        refreshUser().finally(() => setLoading(false));
    }, [token]);

    const setAuthTokens = (token: string, refreshToken: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setToken(token);
        setTokenHeader(token);
    }

    const refreshUser = async () => {
        if (token) {
            await setUser(getUserFromToken(token));
        } else {
            await setUser(GUEST_USER);
        }
    }

    const refreshToken = async () => {
        let token = localStorage.getItem("token");
        let refreshToken = localStorage.getItem("refreshToken");
        let response = await postRequest("/api/refresh", {
            accessToken: token,
            refreshToken: refreshToken
        });

        if (response.data.responseStatus === "OK") {
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
        }
    }

    const authRequest = async (
        route: string,
        body: any,
        request: (route: string, body: any) => Promise<AxiosResponse>
    ) => {
        if (token === null) {
            return;
        }
        let response = await request(route, body);
        if (response.status === 401) {
            await refreshToken();
            response = await request(route, body);
        }

        return response;
    }

    const signIn = async (accessToken: string, provider: string) => {
        let response = await postRequest(`/api/auth/${provider}`, {
           accessToken: accessToken
        });
        if (response.data.responseStatus === "OK") {
            setAuthTokens(response.data.accessToken, response.data.refreshToken);
            refreshUser().then(() => {
                window.location.href = "/";
            });
        }

    };

    const logOut = (callback: () => void) => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setTokenHeader(null);
        callback();
        window.location.href = "/";
    }

    const getAuthRequest = async (route: string, body: any) => {
        return authRequest(route, body, getRequest);
    }

    const postAuthRequest = async (route: string, body: any) => {
        return authRequest(route, body, postRequest);
    }

    const value = {
        user,
        isLoading,
        signIn,
        logOut,
        getAuthRequest,
        postAuthRequest
    };

    return <AuthContext.Provider value={value}>
        {!initLoading && children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}