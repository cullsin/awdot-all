import React, { useEffect, useState } from 'react';
import MainRouter from '../../routers/main';
import DomainRouter from '../../routers/domain';
import { getSubDomain, isDomainRouter } from '../../engine';

const Content = () => {
    const [subDomain, setSubDomain] = useState({});
    useEffect(() => {
        setSubDomain(getSubDomain());
    }, []);
    
    return isDomainRouter(subDomain) ? <DomainRouter domain={subDomain.name} /> : <MainRouter /> 
}

export default Content;