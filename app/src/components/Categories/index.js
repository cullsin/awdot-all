import React, {useState, useEffect} from 'react';
import {Card, InputGroup, Form, Button, ListGroup, Badge} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    initCategoriesRequest,
    insertCategoriesRequest,
    companiesCategoriesRequest,
    removeCategoriesRequest    
} from '../../db/action/categories';
import {HiOutlineUpload} from 'react-icons/hi';
import {MdOutlineSubtitles, MdCategory} from 'react-icons/md';
import {isUndefined, isEmpty, isObject } from 'lodash'
import PageHeader from '../PageHeader';
import Error from '../Error';
    
const Categories = (props) => {
    const {upload, companies, login, insert, remove, connect_id, setActiveIndex, indexNumber} = props;
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listLoading, setListLoading] = useState(false);
    const [info, setInfo] = useState({
        content: '',
        variant: ''
    });
    const [upcategories, setUpcategories] = useState({
        name: ''
    });
    const handleChange = (e) => {
        let {name, value} = e.target;
        const object = {...upcategories};
        object[name] = value.toLowerCase().replace(' ','_');
        setUpcategories(object);
    };

    const handleSubmit = () => {
        if (isEmpty(upcategories.name) === true) {
            setInfo({
                ...info,
                  content: 'Please give a category name',
                  variant: 'warning'
            });
            setShowError(true);
            return;  
        }
        setLoading(true);
        props.insertCategoriesRequest({
            companies_id: connect_id,
            name: upcategories.name    
        })
    }

    useEffect(() => {
        const {success, code, message} = insert;
        if(isUndefined(success)) {
            return false;
        }
        if(success === true) { 
            setLoading(false);
            props.companiesCategoriesRequest({
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
        props.companiesCategoriesRequest({
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
            props.companiesCategoriesRequest({
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
        <PageHeader title={`Add Categories | Tags `} show={loading} className={'mb-4'}/>
        {showError && <Error content={info.content} variant={info.variant} setShowError={setShowError} />}
        <Card border={'light'} className={'border-0'}>        
            <Form.Group className={'mb-3 border ew-border-gradient'}>
                <InputGroup>
                <InputGroup.Text className={'bg-white border-0'}><MdOutlineSubtitles /></InputGroup.Text>
                <Form.Control  size={'lg'} 
                    className={'border-0'} required
                    placeholder={'name'} 
                    defaultValue={upcategories.name} 
                    name={'name'} 
                    onChange={(event) => handleChange(event)}/> 
                </InputGroup>
            </Form.Group>
            <Form.Group className={'m-2 justify-content-end'}>
                <Button onClick={() => handleSubmit()}>
                    Submit
                  </Button>
            </Form.Group>      
        </Card>
        <PageHeader title={`Categories`} show={listLoading} className={'mt-4 mb-2'}/>
        <Card border={'light'} className={'border-0'}>
        <ListGroup>
            {companies.companies && companies.companies.length > 0 && companies.companies.map((object, key) => {  
                  return (<ListGroup.Item key={key}><Badge bg={'success'} className={'m-2 mb-0 mt-0'}>{key}</Badge><span>{object.category.name}</span>
                    <span className={'float-end'} onClick={() => props.removeCategoriesRequest({catcompanies_id:object.id})}>
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
        remove: state.categories.remove || {},
        insert: state.categories.insert || {},
        companies: state.categories.companies || [],  
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initCategoriesRequest,
        insertCategoriesRequest,
        companiesCategoriesRequest,
        removeCategoriesRequest
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Categories);