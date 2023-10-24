import React, {useEffect, useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LPartners from '../../components/Partners/List';
import EPartners from '../../components/Partners/Edit';
const PartnersLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [partners_id, setPartnersId] = useState();
    
    useEffect(() => {
        if (props.isMenu === true) {
            setIndex(0);
        }
    }, [props])

    return (
    <>    
    <Container fluid className={'ew-partners'}>
        <Row className={'vh-100'}>
            {index === 0 && <Col md={10} className={'align-items-center'}>
                <LPartners {...props} setIndex={setIndex} setPartnersId={setPartnersId} /></Col>}
            {index === 1 && <Col md={4} className={'align-items-center'}>
                <EPartners {...props} setIndex={setIndex} partners_id={partners_id}/></Col>}
            
        </Row>
    </Container>
    </>
    );
}

export default PartnersLayout;