import "./AuthorizationPage.css";

import {Col, Container, Row} from "react-bootstrap";
import {LoginButton} from "./LoginButton";
import {useAuth} from "../../hook/useAuth";

export const AuthorizationForm = () => {
    const vkAuthorizeUrl = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=popup&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/getToken&scope=offline&response_type=token&v=5.131`;
    const yandexAuthorizeUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.REACT_APP_YANDEX_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/getToken`;

    const { signIn } = useAuth();

    return (
        <div className="d-flex flex-column vh-100">
            <Container fluid={true} className="d-flex h-100 justify-content-center align-items-center p-0">
                <Row className="bg-white shadow-sm">
                    <Col className="border rounded p-4 btn-container">
                        <h1 className="login-title">Войти</h1>

                        <LoginButton
                            url={yandexAuthorizeUrl}
                            className="btn-yandex"
                            imgLogo={{ src: "yandex", alt: "yandex logo" }}
                            text="Войти с Яндекс ID"
                            callback={(accessToken) => {
                                signIn(accessToken, "yandex").then(() => {});
                            }}
                        />
                        <LoginButton
                            url={vkAuthorizeUrl}
                            className="btn-vk"
                            imgLogo={{ src: "vk", alt: "vkontakte logo" }}
                            text="Войти через ВКонтакте"
                            callback={(accessToken) => {
                                signIn(accessToken, "vk").then(() => {});
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}