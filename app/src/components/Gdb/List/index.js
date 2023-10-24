import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {CgRename} from 'react-icons/cg';
import Confirmation from '../../Confirmation';
import { listGDBCompaniesRequest, searchGDBCompaniesRequest, mailGDBCompaniesRequest } from '../../../db/action/gdb';

import PageHeader from '../../PageHeader';
import Error from '../../Error';
import { TbCircleDot } from 'react-icons/tb';
const GLBuy = (props) => {
    const {GDBCompaniesList, GDBCompaniesSearch, mailGDBCompaniesRequest, 
        setIndex, setGDBCompaniesId, login, 
        GDBCompaniesMail, searchGDBCompaniesRequest} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.listGDBCompaniesRequest({});
    }, []);

    const handleChange = (e) => {
        const {value} = e.target;
        setName(value);
    };

    useEffect(() => {
        const {success, code, message} = GDBCompaniesList;
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
            setCompanies(GDBCompaniesList.companies);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [GDBCompaniesList]);

    useEffect(() => {
        const {success, code, message} = GDBCompaniesSearch;
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
            setCompanies(GDBCompaniesSearch.companies);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [GDBCompaniesSearch]);

    useEffect(() => {
        const {success, code, message} = GDBCompaniesMail;
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
    }, [GDBCompaniesMail]);

    if(GDBCompaniesMail.companies && GDBCompaniesMail.companies.id) {
        return (<Confirmation title={'Confirmation'} type={'GMBuy'} />);
    }

    if (companies && companies.length === 0) {
        return (<Confirmation title={'Hidden Exchange'} type={'GLBuy'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'Hidden Exchange'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
            <Row>
                        <Col md={7}>
                    
                <Form.Group className={'mb-3 border ew-border-gradient'}>
                        <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><CgRename /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        className={'border-0'} required
                        placeholder={'Search Company'} 
                        defaultValue={name} 
                        name={'name'} 
                        onChange={(event) => handleChange(event)}/> 
                    <Button className={'btn btn-sm btn-primary text-right'} onClick={() =>{
                            setLoading(true);searchGDBCompaniesRequest({name})  
                        }}><small>Search</small></Button>
                    </InputGroup>
                </Form.Group>
                </Col>
                    </Row>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Index</th>
                        <th>Company Name</th>
                        <th>Selling Price</th>
                        <th>Available Shares</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {companies && companies.map((company, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td>{company.id}</td>
                            <td>{company.name.toLowerCase()}</td>
                            <td>{company.selling_price || '--' } </td>
                            <td>{company.available_of_shares || '--' }</td>
                            <td onClick={() => {setIndex(1);setGDBCompaniesId(company.id)}}>
                                <Button className={'btn btn-sm btn-primary'} onClick={() => mailGDBCompaniesRequest({
                                    companies_id: company.id,
                                    requested_by: props.login.user_id,
                                    name:company.name,
                                    user_name: props.login.name
                                })}><small>Request</small></Button>  
                            </td>
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
      GDBCompaniesList: state.gdb.list || {},
      GDBCompaniesSearch: state.gdb.search || {},
      GDBCompaniesMail: state.gdb.mail || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listGDBCompaniesRequest,
        searchGDBCompaniesRequest,
        mailGDBCompaniesRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(GLBuy);