import "./FooterComponent.css";
import {ContainerComponent} from "./ContainerComponent";

export const FooterComponent = () => {
    return (
        <footer className="mt-auto">
            <ContainerComponent className="p-4">
                <p className="footer-title">Разработчики</p>
                <div className="footer-developers">
                    <a href="https://github.com/if0ne">Агафонов Павел</a>
                    <a href="https://github.com/maximastashkin">Асташкин Максим</a>
                    <a href="https://github.com/AleksejRonzhin">Ронжин Алексей</a>
                    <a href="https://github.com/paavill">Чистяков Павел</a>
                </div>
            </ContainerComponent>
        </footer>
    );
}