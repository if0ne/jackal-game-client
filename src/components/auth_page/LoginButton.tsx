//@ts-ignore
import yandexLogo from "../../assets/yandex_logo.svg";

//@ts-ignore
import vkLogo from "../../assets/vk_logo.svg";

import {useEffect, useState} from "react";
import queryString from "query-string";

type LoginButtonProps = {
    url: string,
    className: string,
    imgLogo: {
        src: any,
        alt: string,
    }
    text: string,
    callback: (accessToken: string) => void
}

export const LoginButton = (props: LoginButtonProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = () => {
        //@ts-ignore
        window.SetTokenCallback = undefined;

        //@ts-ignore
        window.SetTokenCallback = (url: string) => {
            let query = queryString.parse(url);
            if (query["http://localhost:3000/getToken#access_token"] !== undefined) {
                const newToken = query["http://localhost:3000/getToken#access_token"] as string;
                setAccessToken(newToken);
            }
        }

        window.open(props.url, 'auth', "menubar=no, location=no, resizable=no, scrollbars=no, status=no, width=800, height=600, top=100, left=100");

    };

    const getButtonLogo = () => {
        switch (props.imgLogo.src) {
            case "yandex": return yandexLogo;
            case "vk": return vkLogo;
        }
    }

    useEffect(() => {
        console.log(props.imgLogo.src);
    }, []);

    useEffect(() => {
        if (accessToken != null) {
            props.callback(accessToken);
        }
    }, [accessToken]);

    return (
        <button className={`btn btn-logo ${props.className} my-1`} onClick={login}>
            <img className="logo-img" src={getButtonLogo()} alt={props.imgLogo.alt}/>
            <span>{props.text}</span>
        </button>
    );
}