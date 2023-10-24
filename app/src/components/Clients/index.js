import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button, ListGroup, Badge} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    initClientsRequest,
    insertClientsRequest,
    partnersClientsRequest,
    removeClientsRequest    
} from '../../db/action/clients';
import { 
    listCompaniesRequest    
} from '../../db/action/companies';
import {find} from 'lodash';
import { Typeahead } from 'react-bootstrap-typeahead';
import {MdOutlineSubtitles, MdCategory} from 'react-icons/md';
import {isUndefined, isEmpty, isObject } from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';
    
const Clients = (props) => {
    const {upload, partners, CompaniesList, login, insert, remove, connect_id, setActiveIndex, indexNumber} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [upclients, setUpclients] = useState({
        clients_id: ''
    });
    
    const handleCompaniesId = (valueMixed) => {
        const object = {...upclients};
        object.clients_id = valueMixed.length ? [valueMixed[0].id]: [];
        setUpclients(object); 
    };

    const handleSubmit = () => {
        if (isEmpty(upclients.clients_id[0]) === true) {
            setInfo({
                ...info,
                  content: 'Please select a company name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.insertClientsRequest({
            partners_id: connect_id,
            clients_id: upclients.clients_id[0]
        })
    }

    useEffect(() => {
        const {success, code, message} = insert;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            props.partnersClientsRequest({
                partners_id: connect_id
            });
            setListLoading(true);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setLoading(false);
        } 
    }, [insert]);

    useEffect(() => {
        const {success, code, message} = partners;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setListLoading(false);
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setListLoading(false);
        } 
    }, [partners]);

    useEffect(() => {
        setListLoading(true);
        props.listCompaniesRequest({});
    }, [connect_id]);

    
    useEffect(() => {
        if (CompaniesList.companiesList && CompaniesList.companiesList.length > 0) {
            setListLoading(true);
            props.partnersClientsRequest({
                partners_id: connect_id
            });
        }
    }, [CompaniesList]);

    useEffect(() => {
        const {success, code, message} = remove;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setListLoading(true);
            props.partnersClientsRequest({
                partners_id: connect_id
            });
        } else {
            setInfo({
                ...info,
                    content: `${code} - ${message}`,
                    variant: 'warning'
            });
            setShowError(true);
            setListLoading(false);
        } 
    }, [remove]);

    const getCompanyName = (id) => {
        const result = find(CompaniesList.companiesList, function(item) {
            return item.companies_id === id
        });
        return result.name;
    }

    return (
        <React.Fragment>
        <PageHeader title={`Are you a partner with Companies already ? `} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>        
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdCategory /></InputGroup.Text>
                <Typeahead
                    multiple={false}
                    id='ew-companies-info'
                    style={{width: '60%'}}
                    className={'border-0'}
                    labelKey="name"
                    onChange={(value) => handleCompaniesId(value)}
                    options={CompaniesList.companiesList}
                    placeholder="Companies List"
                    selected={upclients.companies_id}
                /> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'m-2 justify-content-end'}>
                <Button onClick={() => handleSubmit()}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        <PageHeader title={`Clients`} show={listLoading} className={'mt-4 mb-2'}/>
        <Card border={'light'} className={'border-0'}>
        <ListGroup>
            {partners.partners && partners.partners.length > 0 && partners.partners.map((object, key) => {  
                  return (<ListGroup.Item key={key}><Badge bg={'success'} className={'m-2 mb-0 mt-0'}>{key}</Badge><span>{getCompanyName(object.clients_id)}</span>
                    <span className={'float-end'} onClick={() => props.removeClientsRequest({prodpartners_id:object.id})}>
                        <i className="bi bi-trash3"></i>
                    </span></ListGroup.Item>);  
            })}
        </ListGroup>
        </Card>
        {indexNumber && <Card border={'light'} className={'border-0 mt-5'}>
            <Form.Group className={'justify-content-end'}>
                <Button onClick={() => setActiveIndex(indexNumber)}>
                    {props.buttonName}
                  </Button>
            </Form.Group>
        </Card>}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        remove: state.clients.remove || {},
        insert: state.clients.insert || {},
        partners: state.clients.partners || [],
        CompaniesList: state.companies.list || {}  
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initClientsRequest,
        insertClientsRequest,
        partnersClientsRequest,
        removeClientsRequest,
        listCompaniesRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Clients);