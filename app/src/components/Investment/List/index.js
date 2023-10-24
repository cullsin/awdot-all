import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiEdit, FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { listInvestmentRequest } from '../../../db/action/investment';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LInvestment = (props) => {
    const {InvestmentList, setIndex, setInvestmentId} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.listInvestmentRequest({});
    }, []);

    useEffect(() => {
        const {success, code, message} = InvestmentList;
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
    }, [InvestmentList]);

    if (InvestmentList.investments && InvestmentList.investments.length === 0) {
        return (<Confirmation title={'My Investments'} type={'LInvestment'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'My Investments'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
                <Button className={'btn btn-sm btn-primary text-right'} onClick={() => setIndex(1)}><small>Add Investment</small></Button>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Country</th>
                        <th>Count</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {InvestmentList.investments && InvestmentList.investments.map((investment, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{investment.name}</td>
                            <td>{investment.type}</td>
                            <td>{investment.country}</td>
                            <td>{investment.shares.length || 0}</td>
                            <td onClick={() => {setIndex(1);setInvestmentId(investment.investment_id)}}><FiEdit /></td>
                            <td><FiTrash /></td>
                        </tr>
                    )
                    })}    
                    </tbody>
            </Table>
        </Row>
        </Card.Body></Card>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      InvestmentList: state.investment.list || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listInvestmentRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LInvestment);