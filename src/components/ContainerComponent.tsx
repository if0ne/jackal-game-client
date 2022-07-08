import {Container} from "react-bootstrap";

export const ContainerComponent = (props: any) => {
    return (<Container className={props.className} style={{maxWidth: "960px"}}>
        {props.children}
    </Container>)
}