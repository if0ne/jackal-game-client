import {useEffect} from "react";

export const TokenPage = () => {
    useEffect(() => {
        window.close();

        return () => {
            window.opener.SetTokenCallback(window.location.href);
        }
    }, []);

    return (
        <div>
            Это страница с токеном
        </div>
    )
}