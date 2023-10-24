import React, {useState, useEffect} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LInvestment from '../../components/Investment/List';
import EInvestment from '../../components/Investment/Edit';
const InvestmentLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [investment_id, setInvestmentId] = useState();
    useEffect(() => {
        if (props.isMenu === true) {
            setIndex(0);
        }
    }, [props])

    return (
    <>    
    <Container fluid className={'ew-investment'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={6} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            {index === 0 && <Col md={5}><LInvestment {...props} setIndex={setIndex} setInvestmentId={setInvestmentId} /></Col>}
            {index === 1 && <Col md={4}><EInvestment {...props} setIndex={setIndex} investment_id={investment_id}/></Col>}
        </Row>
    </Container>
    </>
    );
}

export default InvestmentLayout;