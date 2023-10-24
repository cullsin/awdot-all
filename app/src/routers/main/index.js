
import {Route, Routes, Navigate} from 'react-router-dom';
import Login from '../../layout/login';
import RegisterUser from '../../layout/registerUser';
import ForgetPassword from '../../layout/forget';
import ActivateUser from '../../layout/activateUser';
import Profile from '../../layout/profile';
import File from '../../layout/file';
import Companies from '../../layout/companies';
import Partners from '../../layout/partners';
import Investment from '../../layout/investment';
import Proposal from '../../layout/proposal';
import Buy from '../../layout/buy';
import Wallet from '../../layout/wallet';
import Purchase from '../../layout/purchase';
import Redeem from '../../layout/redeem';
import Bank from '../../layout/bank';
import PurchaseStatus from '../../layout/purchase/status';

const Routers = () => {
    return ( 
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/forget' element={<ForgetPassword />} />
        <Route path='/active' element={<ActivateUser />} />
        <Route path='/companies' element={<Companies isMenu />} />
        <Route path='/investment' element={<Investment isMenu />} />
        <Route path='/partners' element={<Partners isMenu />} />
        <Route path='/proposal' element={<Proposal />} />
        <Route path='/buy' element={<Buy/>} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/redeem' element={<Redeem />} />
        <Route path='/bank' element={<Bank />} />
        <Route path='/purchase/status' element={<PurchaseStatus />} />
        <Route path='/profile' element={<Profile menu />} />
        <Route path='/file' element={<File/>} />
        <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
    );
}
export default Routers;