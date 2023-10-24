import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiEdit, FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { listPartnersRequest } from '../../../db/action/partners';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LPartners = (props) => {
    const {PartnersList, setIndex, setPartnersId} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.listPartnersRequest();
    }, []);

    useEffect(() => {
        const {success, code, message} = PartnersList;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'success'
            });
            setShowError(true);
            setLoading(false);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [PartnersList]);

    if (PartnersList.partnersList && PartnersList.partnersList.length === 0) {
        return (<Confirmation title={'My Partners'} type={'LPartners'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'My Partners'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
                <Button className={'btn btn-sm btn-primary text-right'} onClick={() => setIndex(1)}><small>Add Partners</small></Button>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {PartnersList.partnersList && PartnersList.partnersList.map((partner, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{partner.name}</td>
                            <td>{partner.email}</td>
                            <td>{partner.phoneCode + ' ' + partner.phone}</td>
                            <td onClick={() => {setIndex(1);setPartnersId(partner.partners_id)}}><FiEdit /></td>
                            <td><FiTrash /></td>
                        </tr>
                    )
                    })}    
                    </tbody>
            </Table>
        </Row>
        </Card.Body>
        </Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      PartnersList: state.partners.list || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listPartnersRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LPartners);