import React from "react";
import { Card, CardBody, Row } from "reactstrap";
import { GiGrain, GiSadCrab, GiFriedEggs, GiFriedFish, GiCoconuts, GiAlmond, GiMilkCarton, GiSesame, GiSnail } from 'react-icons/gi';

const AllergensComponent = (props) => {

    const allergens = props.allergens;

    let alg_cards = [];

    allergens.split("").forEach(char => {
        if (char === "A") alg_cards.push(<Card key="A" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiGrain/></CardBody></Card>);
        if (char === "B") alg_cards.push(<Card key="B" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiSadCrab /></CardBody></Card>);
        if (char === "C") alg_cards.push(<Card key="C" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiFriedEggs /></CardBody></Card>);
        if (char === "D") alg_cards.push(<Card key="D" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiFriedFish /></CardBody></Card>);
        if (char === "E") alg_cards.push(<Card key="E" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiCoconuts /></CardBody></Card>);
        if (char === "F") alg_cards.push(<Card key="F" style={{marginRight: "5px"}} color="dark" inverse><CardBody>F</CardBody></Card>);
        if (char === "G") alg_cards.push(<Card key="G" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiMilkCarton /></CardBody></Card>);
        if (char === "H") alg_cards.push(<Card key="H" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiAlmond /></CardBody></Card>);
        if (char === "L") alg_cards.push(<Card key="L" style={{marginRight: "5px"}} color="dark" inverse><CardBody>L</CardBody></Card>);
        if (char === "M") alg_cards.push(<Card key="M" style={{marginRight: "5px"}} color="dark" inverse><CardBody>M</CardBody></Card>);
        if (char === "N") alg_cards.push(<Card key="N" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiSesame /></CardBody></Card>);
        if (char === "O") alg_cards.push(<Card key="O" style={{marginRight: "5px"}} color="dark" inverse><CardBody>O</CardBody></Card>);
        if (char === "P") alg_cards.push(<Card key="P" style={{marginRight: "5px"}} color="dark" inverse><CardBody>P</CardBody></Card>);
        if (char === "R") alg_cards.push(<Card key="R" style={{marginRight: "5px"}} color="dark" inverse><CardBody><GiSnail /></CardBody></Card>);
    });

    return (
        <div className="row-space-top">
            <p>Enthält:</p>
            <Row xs="5" className="justify-content-center">
                {alg_cards}
            </Row>
        </div>
    );
}

export default AllergensComponent;