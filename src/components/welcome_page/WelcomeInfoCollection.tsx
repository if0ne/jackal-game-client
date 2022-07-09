import {Row} from "react-bootstrap";

import {ContainerComponent} from "../ContainerComponent";
import {WelcomeCard} from "./WelcomeCard";

//@ts-ignore
import testImage from "../../assets/test_image.jpg";

export const WelcomeInfoCollection = () => {
    return (
        <ContainerComponent className="py-4">
            <Row className="justify-content-md-center row-cols-1 row-cols-md-3 g-4">
                <WelcomeCard title="Это заголовок" text="Проверочный текст. Чуть больше, чем заголовок." picture={testImage}/>
                <WelcomeCard title="Это заголовок" text="Проверочный текст. Чуть больше, чем заголовок." picture={testImage}/>
                <WelcomeCard title="Это заголовок" text="Проверочный текст. Чуть больше, чем заголовок." picture={testImage}/>
                <WelcomeCard title="Это заголовок" text="Проверочный текст. Чуть больше, чем заголовок." picture={testImage}/>
                <WelcomeCard title="Это заголовок" text="Проверочный текст. Чуть больше, чем заголовок." picture={testImage}/>
                <WelcomeCard title="Это заголовок" text="Проверочный текст. Чуть больше, чем заголовок." picture={testImage}/>
            </Row>
        </ContainerComponent>
    );
}