import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {Col, Row, InputGroup, Form, Button, Card, Table, Image} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {isUndefined } from 'lodash';
import {FiEdit, FiTrash} from 'react-icons/fi';
import Confirmation from '../../Confirmation';
import { listCompaniesRequest } from '../../../db/action/companies';
import PageHeader from '../../PageHeader';
import Error from '../../Error';
const LCompanies = (props) => {
    const {CompaniesList, setIndex, setCompaniesId} = props;
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    useEffect(() => {
        setLoading(true);
        props.listCompaniesRequest();
    }, []);

    useEffect(() => {
        const {success, code, message} = CompaniesList;
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
    }, [CompaniesList]);

    if (CompaniesList.companiesList && CompaniesList.companiesList.length === 0) {
        return (<Confirmation title={'My Companies'} type={'LCompanies'} setIndex={setIndex} />);
    }

    return (
        <React.Fragment>
        <PageHeader title={'My Companies'} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card>
            <Card.Header className={'p-2 bg-white text-end'}>
                <Button className={'btn btn-sm btn-primary text-right'} onClick={() => setIndex(1)}><small>Add Companies</small></Button>
            </Card.Header>
            <Card.Body>
        <Row>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th></th>
                        <th>Short Name</th>
                        <th>Name</th>
                        <th>Number of Shares</th>
                        <th>Base Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {CompaniesList.companiesList && CompaniesList.companiesList.map((company, key) => {
                    return (
                        <tr key={key}>
                            <td><Image src={'https://via.placeholder.com/20'} roundedCircle/></td>
                            <td><a href={`https://${company.domain && company.domain.name}.awdot.com`} target={'_blank'}>{company.short_name}</a></td>
                            <td>{company.name}</td>
                            <td>{company.share.number_of_shares}</td>
                            <td>{company.share.base_price}</td>
                            <td onClick={() => {setIndex(1);setCompaniesId(company.companies_id)}}><FiEdit /></td>
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
      CompaniesList: state.companies.list || {}
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        listCompaniesRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LCompanies);