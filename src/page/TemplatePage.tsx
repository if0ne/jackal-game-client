import {FooterComponent} from "../components/FooterComponent";
import {NavbarComponent} from "../components/NavbarComponent";

export const TemplatePage = (props: any) => {
    return (
        <div>
            <div className="d-flex flex-column min-vh-100">
                <NavbarComponent/>
                {props.children}
            </div>
            <FooterComponent/>
        </div>)
}