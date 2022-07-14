import {ContainerComponent} from "../ContainerComponent";
import {Col, Row} from "react-bootstrap";

export const RuleCard = (props: any) => {
    return (
        <ContainerComponent className="my-4 rule-card">
            <Row>
                <Col sm={4} className="p-0">
                    {props.children}
                </Col>
                <Col sm={8} className="p-4">
                    <h3>{props.name}</h3>
                    <p><b>Действие:</b> {props.action}</p>
                    <p><b>Момент выполнения:</b> {props.timing}</p>
                    <p><b>Тип:</b> {props.type}</p>
                    <p><b>Возможность стоять:</b> {props.canStay}</p>
                    <p><b>Возможность заходить с монетой:</b> {props.canGoWithMoney}</p>
                </Col>
            </Row>
        </ContainerComponent>
    )
}