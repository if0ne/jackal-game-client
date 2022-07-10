import "./AuthorizationPage.css";

import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import queryString from "query-string";
import jwtDecode from "jwt-decode";

//@ts-ignore
import yandexLogo from "../assets/yandex_logo.svg";

//@ts-ignore
import vkLogo from "../assets/vk_logo.svg";

function AuthorizationPage() {
    const vkCodeUrl = "https://oauth.vk.com/authorize?client_id=8212997&display=popup&redirect_uri=http://localhost:3000/getToken&scope=offline&response_type=code&v=5.131";

    /*const vkAccessTokenUrl = (code: string) => {
        return `https://oauth.vk.com/access_token?client_id=8212997&client_secret=6D93pYVDAGf4F8mABXkp&redirect_uri=http://localhost:3000/getToken&code=${code}&v=5.131`;
    }*/

    const yandexAuthorizeUrl = "https://oauth.yandex.ru/authorize?response_type=token&client_id=e431653fdda94550bf9d9941bca409b3&redirect_uri=http://localhost:3000/getToken"

    const [token, setToken] = useState(null);

    //TODO: Разбить на компонеты
    const loginViaYandex = () => {
        //@ts-ignore
        window.SetTokenCallback = (url: string) => {
            let query = queryString.parse(url);
            if (query["http://localhost:3000/getToken#access_token"] !== undefined) {
                const newToken = query["http://localhost:3000/getToken#access_token"];
                console.log(newToken);
            }
        }

        window.open(yandexAuthorizeUrl, 'auth', "menubar=no, location=no, resizable=no, scrollbars=no, status=no, width=800, height=600, top=100, left=100");
        //@ts-ignore
        window.SetTokenCallback = undefined;
    }

    const loginViaVk = () => {
        //@ts-ignore
        window.SetTokenCallback = (url: string) => {
            let query = queryString.parse(url);
            if (query["http://localhost:3000/getToken?code"] !== undefined) {
                const codeFromQuery = query["http://localhost:3000/getToken?code"];
                console.log(codeFromQuery);
            }
        }

        window.open(vkCodeUrl, 'auth', "menubar=no, location=no, resizable=no, scrollbars=no, status=no, width=800, height=600, top=100, left=100");
        //@ts-ignore
        window.SetTokenCallback = undefined;
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

    return (
        <div className="d-flex flex-column vh-100">
            <Container fluid={true} className="d-flex h-100 justify-content-center align-items-center p-0">
                <Row className="bg-white shadow-sm">
                    <Col className="border rounded p-4 btn-container">
                        <h1 className="login-title">Войти</h1>

                        <div id="signInGoogleDiv" className="btn-google py-1">
                        </div>

                        <div className="py-1">
                            <button className="btn btn-logo btn-yandex" onClick={loginViaYandex}>
                                <img className="logo-img" src={yandexLogo} alt="yandex logo"/>
                                <span>Войти с Яндекс ID</span>
                            </button>
                        </div>

                        <div className="py-1">
                            <button className="btn btn-logo btn-vk" onClick={loginViaVk}>
                                <img className="logo-img" src={vkLogo} alt="vkontakte logo"/>
                                <span>Войти через ВКонтакте</span>
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AuthorizationPage;