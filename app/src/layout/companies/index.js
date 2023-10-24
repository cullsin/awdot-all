import React, {useEffect, useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import LCompanies from '../../components/Companies/List';
import ECompanies from '../../components/Companies/Edit';
const CompaniesLayout = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [companies_id, setCompaniesId] = useState();
    
    useEffect(() => {
        if (props.isMenu === true) {
            setIndex(0);
        }
    }, [props])

    return (
    <>    
    <Container fluid className={'ew-companies'}>
        <Row className={'align-items-center vh-100'}>
            <Col md={6} className={' d-flex align-items-center'}>
                <Row className={'justify-content-center'}>
                    <Col md={9} className={'justify-content-center d-flex align-items-center'}>    
                        {show === false && <Spinner color={'#BB82FD'} />}
                        <Image src={showSvg} fluid onLoad={() => setShow(true)}/>
                    </Col>
                </Row>       
            </Col>
            {index === 0 && <Col md={5}><LCompanies {...props} setIndex={setIndex} setCompaniesId={setCompaniesId} /></Col>}
            {index === 1 && <Col md={4}><ECompanies {...props} setIndex={setIndex} companies_id={companies_id}/></Col>}
            
        </Row>
    </Container>
    </>
    );
}

export default CompaniesLayout;