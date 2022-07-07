import {useEffect, useState} from "react";
import queryString from "query-string";
import jwtDecode from "jwt-decode";

function LoginPage() {
    //const page = "https://oauth.vk.com/authorize?client_id=8212997&display=popup&redirect_uri=http://localhost:3000/getToken&scope=offline&response_type=token&v=5.131";

    const yandexCallbackPage = "https://oauth.yandex.ru/authorize?response_type=token&client_id=e431653fdda94550bf9d9941bca409b3&redirect_uri=http://localhost:3000/getToken"
    const [token, setToken] = useState(null);

    const loginViaYandex = () => {
        //@ts-ignore
        window.SetTokenCallback = (url: string) => {
            console.log(url);
            let query = queryString.parse(url);

            if (query["http://localhost:3000/getToken#access_token"] !== undefined) {
                const new_token = query["http://localhost:3000/getToken#access_token"];
                console.log(new_token);
                //@ts-ignore
                setToken(new_token);
            }
        }

        let auth_widget = window.open(yandexCallbackPage, 'auth', "menubar=no, location=no, resizable=no, scrollbars=no, status=no, width=800, height=600, top=100, left=100");
    }

    useEffect(() => {
        //@ts-ignore
        google.accounts.id.initialize({
            client_id: "582286245104-phr8rri2nd5bmqdmufsdsaokcq8qos7b.apps.googleusercontent.com",
            callback: (response: any) => {
                let info = jwtDecode(response.credential);
                console.log(info);
            }
        });

        //@ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("signInGoogleDiv"),
            { theme: "outline", size: "large" }
        );
    }, [])

    const logout = () => {
        setToken(null);
    }

    /*return (
      <div>
          <button className="btn btn-dark" onClick={token === null ? login : logout}>{token === null ? "Войти" : "Выйти"}</button>
      </div>
    );*/

    return (
        <div>
            <div id="signInGoogleDiv"></div>
            <button className="btn btn-dark" onClick={token === null ? loginViaYandex : logout}>{token === null ? "Войти" : "Выйти"}</button>
        </div>
    )
}

export default LoginPage;