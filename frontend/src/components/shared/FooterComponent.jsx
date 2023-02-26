import React, { useEffect, useState } from "react";
import {Col, Container, List, Row} from 'reactstrap';
import Api from '../../service/ApiService';

const FooterComponent = () => {

    const API = new Api();
    const [settings, setSettings] = useState();

    useEffect(() => {
        API.getPageSettings()
            .then((res) => {
                let data = res.data;
                setSettings(data);
            })
    }, [])

    return (
        <footer>
            <Container>
                <hr />
                <Row xs="1" sm="2" md="4">
                    <Col>
                        <h5 className="text-warning">Lokation</h5>
                        <List type="unstyled">
                            <li>{settings?settings.street_name:0}</li>
                            <li>{settings?settings.street_num:0}</li>
                            <li>{settings?settings.postal_and_city:0}</li>
                        </List>
                    </Col>
                    <Col>
                        <h5 className="text-warning">Offnungszeiten</h5>
                        <List type="unstyled">
                            <li>Montag - Freitag</li>
                            <li>Samstag</li>
                            <li>Sonntag</li>
                        </List>
                    </Col>
                    <Col>
                        <h5 className="hidden">---</h5>
                        <List type="unstyled">
                            <li>{settings?settings.open_mo_fr:0}</li>
                            <li>{settings?settings.open_sat:0}</li>
                            <li>{settings?settings.open_sun:0}</li>
                        </List>
                    </Col>
                    <Col id="contact">
                        <h2 className="logo-font text-center">Cibo Colorato</h2>
                        <List type="unstyled" className="text-center">
                            <li>soc</li>
                            <li>{settings?settings.phone:0}</li>
                        </List>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default FooterComponent;