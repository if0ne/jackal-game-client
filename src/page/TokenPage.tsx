import {useEffect} from "react";

export const TokenPage = () => {
    useEffect(() => {
        window.opener.SetTokenCallback(window.location.href);
        window.close();
    }, []);

    return (
        <div>
            Это страница с токеном
        </div>
    )
}