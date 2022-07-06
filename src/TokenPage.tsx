import {useEffect} from "react";
import queryString from "query-string";

type TokenPageProps = {
    win: Window
}

function TokenPage({ win }: TokenPageProps) {
    useEffect(() => {
        let query = queryString.parse(win.location.href);

        if (query["http://localhost:3000/getToken#access_token"] !== undefined) {
            console.log(query["user_id"]);
            console.log(query["http://localhost:3000/getToken#access_token"]);

            const token = query["http://localhost:3000/getToken#access_token"];

            const getUserInfo = async () => {
                const userInfo = await fetch(`https://api.vk.com/method/account.getProfileInfo&access_token=${token}&v=5.131`);
                console.log(userInfo);
            };

            getUserInfo().then(() => console.log("success")).catch((err) => console.log(err));
        }

        win.location.href = "/";
    }, [win.location.href])

    return (
        <div>
            Это страница с токеном
        </div>
    )
}

export default TokenPage;