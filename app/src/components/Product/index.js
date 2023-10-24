import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button, ListGroup, Badge} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    initProductRequest,
    insertProductRequest,
    companiesProductRequest,
    removeProductRequest    
} from '../../db/action/product';
import {TbGenderEpicene} from 'react-icons/tb';
import {MdOutlineSubtitles, MdCategory} from 'react-icons/md';
import {isUndefined, isEmpty, isObject } from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';
    
const Product = (props) => {
    const {upload, companies, login, insert, remove, connect_id, setActiveIndex, indexNumber} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [upproduct, setUpproduct] = useState({
        name: '',
        summary: ''
    });
    const handleChange = (e) => {
        let {name, value} = e.target;
        const object = {...upproduct};
        object[name] = value.toLowerCase().replace(' ','_');
        setUpproduct(object);
    };

    const handleSubmit = () => {
        if (isEmpty(upproduct.name) === true) {
            setInfo({
                ...info,
                  content: 'Please give a product name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        if (isEmpty(upproduct.summary) === true) {
            setInfo({
                ...info,
                  content: 'Please give a product Summary',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.insertProductRequest({
            companies_id: connect_id,
            name: upproduct.name,
            summary: upproduct.summary    
        })
    }

    useEffect(() => {
        const {success, code, message} = insert;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            props.companiesProductRequest({
                companies_id: connect_id
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
        const {success, code, message} = companies;
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
    }, [companies]);

    useEffect(() => {
        setListLoading(true);
        props.companiesProductRequest({
            companies_id: connect_id
        });    
    }, [connect_id]);

    useEffect(() => {
        const {success, code, message} = remove;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setListLoading(true);
            props.companiesProductRequest({
                companies_id: connect_id
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

    return (
        <React.Fragment>
        <PageHeader title={`Add Product `} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>        
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineSubtitles /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'name'} 
                    defaultValue={upproduct.name} 
                    name={'name'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                    <InputGroup>
                    <InputGroup.Text className={'bg-white border-0'}><TbGenderEpicene /></InputGroup.Text>
                    <Form.Control  size={'lg'} 
                        as="textarea" rows={3}
                        className={'border-0'} required
                        placeholder={'Summary'} 
                        defaultValue={upproduct.suummary} 
                        name={'summary'} 
                        onChange={(event) => handleChange(event)}/> 
                    </InputGroup>
                </Form.Group>
            <Form.Group className={'m-2 justify-content-end'}>
                <Button onClick={() => handleSubmit()}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        <PageHeader title={`Product`} show={listLoading} className={'mt-4 mb-2'}/>
        <Card border={'light'} className={'border-0'}>
        <ListGroup>
            {companies.companies && companies.companies.length > 0 && companies.companies.map((object, key) => {  
                  return (<ListGroup.Item key={key}><Badge bg={'success'} className={'m-2 mb-0 mt-0'}>{key}</Badge><span>{object.category.name}</span>
                    <span className={'float-end'} onClick={() => props.removeProductRequest({catcompanies_id:object.id})}>
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
        remove: state.product.remove || {},
        insert: state.product.insert || {},
        companies: state.product.companies || [],  
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initProductRequest,
        insertProductRequest,
        companiesProductRequest,
        removeProductRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Product);