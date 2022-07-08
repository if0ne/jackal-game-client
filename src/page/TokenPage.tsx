import {useEffect} from "react";

function TokenPage() {
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

export default TokenPage;