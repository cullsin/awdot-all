import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LBank from '../../components/Bank/List';
import EBank from '../../components/Bank/Edit';
const BankLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [bank_id, setBankId] = useState();
    return (
    <>    
    <Container fluid className={'ew-bank'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={6} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            {index === 0 && <Col md={5}><LBank {...props} setIndex={setIndex} setBankId={setBankId} /></Col>}
            {index === 1 && <Col md={4}><EBank {...props} setIndex={setIndex} bank_id={bank_id}/></Col>}
        </Row>
    </Container>
    </>
    );
}

export default BankLayout;