import {Row} from "react-bootstrap";

import {ContainerComponent} from "../ContainerComponent";
import {WelcomeCard} from "./WelcomeCard";

//@ts-ignore
import cardFree from "../../assets/welcome_page/card-1.png";
//@ts-ignore
import cardEasy from "../../assets/welcome_page/card-2.png";
//@ts-ignore
import cardWithFriends from "../../assets/welcome_page/card-3.png";
//@ts-ignore
import cardBecomePirate from "../../assets/welcome_page/card-4.png";
//@ts-ignore
import cardGatherMoney from "../../assets/welcome_page/card-5.png";
//@ts-ignore
import cardAvoidTraps from "../../assets/welcome_page/card-6.png";

export const WelcomeInfoCollection = () => {
    return (
        <ContainerComponent className="py-4">
            <Row className="justify-content-md-center row-cols-1 row-cols-md-3 g-4">
                <WelcomeCard title="Бесплатно" picture={cardFree}/>
                <WelcomeCard title="Просто" picture={cardEasy}/>
                <WelcomeCard title="Играй с друзьями" picture={cardWithFriends}/>
                <WelcomeCard title="Стань пиратом" picture={cardBecomePirate}/>
                <WelcomeCard title="Собирай монеты" picture={cardGatherMoney}/>
                <WelcomeCard title="Уворачивайся от ловушек" picture={cardAvoidTraps}/>
            </Row>
        </ContainerComponent>
    );
}