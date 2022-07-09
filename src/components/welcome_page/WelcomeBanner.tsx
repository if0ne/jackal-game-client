import {ContainerComponent} from "../ContainerComponent";
import {Image} from "react-bootstrap";

//@ts-ignore
import navbarImage from "../../assets/test_image.jpg";

export const WelcomeBanner = () => {
    return (
        <div className="welcome-image">
            <ContainerComponent>
                <Image src={navbarImage} fluid={true} className="w-100" style={{ height: "426px" }}/>
            </ContainerComponent>
        </div>
    );
}