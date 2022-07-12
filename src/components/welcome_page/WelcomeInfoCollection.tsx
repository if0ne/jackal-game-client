import {Row} from "react-bootstrap";

import {ContainerComponent} from "../ContainerComponent";
import {WelcomeCard} from "./WelcomeCard";

//@ts-ignore
import testImage from "../../assets/test_image.jpg";

//@ts-ignore
import freeCard from "../../assets/welcome_page/card-free.svg";

export const WelcomeInfoCollection = () => {
    return (
        <ContainerComponent className="py-4">
            <Row className="justify-content-md-center row-cols-1 row-cols-md-3 g-4">
                <WelcomeCard title="Бесплатно" picture={testImage}/>
                <WelcomeCard title="Просто" picture={testImage}/>
                <WelcomeCard title="Играй с друзьями" picture={testImage}/>
                <WelcomeCard title="Стань пиратом" picture={testImage}/>
                <WelcomeCard title="Собирай монеты" picture={testImage}/>
                <WelcomeCard title="Уворачивайся от ловушек" picture={testImage}/>
            </Row>
        </ContainerComponent>
    );
}