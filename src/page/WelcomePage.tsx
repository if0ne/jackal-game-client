import {TemplatePage} from "./TemplatePage";
import {WelcomeForm} from "../components/welcome_page/WelcomeForm";

export const WelcomePage = () => {
    return (
        <TemplatePage>
            <WelcomeForm/>
        </TemplatePage>
    );
}