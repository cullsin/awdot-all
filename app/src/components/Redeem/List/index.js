import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { userRedeemRequest } from '../../../db/action/redeem';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LRedeem = (props) => {
    const {RedeemList, setIndex, setRedeemId, login} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.userRedeemRequest({
            created_by: login.user_id
        });
    }, []);

    useEffect(() => {
        const {success, code, message} = RedeemList;
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
    }, [RedeemList]);

    if (RedeemList.redeems && RedeemList.redeems.length === 0) {
        return (<Confirmation title={'My Redeems'} type={'LRedeem'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'My Redeems'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
                <Button className={'btn btn-sm btn-primary text-right'} onClick={() => setIndex(1)}><small>Redeem Dots</small></Button>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>DOTS</th>
                        <th>Actual Amount</th>
                        <th>Transaction Amount</th>
                        <th>Total Amount</th>
                        <th>Active</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {RedeemList.redeems && RedeemList.redeems.map((redeem, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{redeem.number_of_dots}</td>
                            <td>{redeem.actual_amount}</td>
                            <td>{redeem.transaction_amount}</td>
                            <td>{redeem.total_amount}</td>
                            <td>{redeem.is_active ? 'true' : 'false'}</td>
                            <td>{redeem.created_date}</td>
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
      login: state.login || {},
      RedeemList: state.redeem.user || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userRedeemRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LRedeem);