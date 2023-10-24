import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiEdit, FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { getBankRequest, deleteBankRequest } from '../../../db/action/bank';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LBank = (props) => {
    const {BankList, setIndex, login, BankDelete} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.getBankRequest({});
    }, []);

    useEffect(() => {
        const {success, code, message} = BankList;
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
    }, [BankList]);

    
    useEffect(() => {
        const {success, code, message} = BankDelete;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) {
            setLoading(true); 
            props.getBankRequest();
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [BankDelete]);

    if (BankList.banks && BankList.banks.length === 0) {
        return (<Confirmation title={'My Banks'} type={'LBank'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'My Banks'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
                <Button className={'btn btn-sm btn-primary text-right'} onClick={() => setIndex(1)}><small>Create Bank</small></Button>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>CODE</th>
                        <th>Name</th>
                        <th>No</th>
                        <th>Currency</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {BankList.banks && BankList.banks.map((bank, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{bank.branch_id}</td>
                            <td>{bank.bank_account_name}</td>
                            <td>{bank.bank_account_no}</td>
                            <td>{bank.bank_currency}</td>
                            <td onClick={() => props.deleteBankRequest({bank_id:bank.id})}><FiTrash /></td>
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
      BankList: state.bank.get || {},
      BankDelete: state.bank.delete || {},
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBankRequest,
        deleteBankRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LBank);