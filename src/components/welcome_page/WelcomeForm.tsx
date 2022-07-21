import "./WelcomePage.css";

//@ts-ignore
import testImage from "../../assets/test_image.jpg";

import {WelcomeBanner} from "./WelcomeBanner";
import {WelcomeInfoCollection} from "./WelcomeInfoCollection";

export const WelcomeForm = () => {
    return (
        <>
            <WelcomeBanner/>
            <WelcomeInfoCollection/>
        </>
    );
}