import {Route, Routes, Navigate} from 'react-router-dom';
import Domain from '../../layout/domain';
const Routers = (props) => {
    return ( 
    <Routes>
        <Route path='*' element={<Domain {...props} />} />
    </Routes>
    );
}
export default Routers;