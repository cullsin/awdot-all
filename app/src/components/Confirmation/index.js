import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PageHeader from '../PageHeader';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const Confirmation = ({type, title, setIndex}) => {
    return (
        <React.Fragment>
            <PageHeader title={title}/>
            {type === 'infoActivateUser' && 
                <React.Fragment> 
                <span> Please check your mail. You must receive an OTP from us.</span>   
            </React.Fragment>
            }
            {type === 'activateUser' && 
                <React.Fragment> 
                    <h6> Account Activated Successfully. Please login</h6>
                    <Link to={'/login'} className={'text-decoration-none'}><small>Login</small></Link>   
                </React.Fragment>
            }
            {type === 'Companies' && 
                <React.Fragment> 
                    <h6> Companies Registered Successfully.</h6>
                    <Link to={'/companies'} className={'text-decoration-none'}><small>Companies</small></Link>   
                </React.Fragment>
            }
            {type === 'Partners' && 
                <React.Fragment> 
                    <h6> Partners Registered Successfully.</h6>
                    <Link to={'/partners'} className={'text-decoration-none'}><small>Partners</small></Link>   
                </React.Fragment>
            }
            {type === 'Investment' && 
                <React.Fragment> 
                    <h6> Investment Registered Successfully.</h6>
                    <Link to={'/investment'} className={'text-decoration-none'}><small>Investment</small></Link>   
                </React.Fragment>
            }
            {type === 'LCompanies' && 
                <React.Fragment> 
                    <h6> You do not have registered any Companies with us. Please create One.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Register Company</small></Button>   
                </React.Fragment>
            }
            {type === 'LPartners' && 
                <React.Fragment> 
                    <h6> You do not have registered any Partners with us. Please create One.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Register Partners</small></Button>   
                </React.Fragment>
            }
            {type === 'LInvestment' && 
                <React.Fragment> 
                    <h6> You do not have registered any Investment Defination with us. Please create One.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Register Investment</small></Button>   
                </React.Fragment>
            }
            {type === 'Profile' && 
                <React.Fragment> 
                    <h6> Profile Completed Successfully. Please Continue...  </h6>
                    <Link to={'/dashboard'} className={'text-decoration-none btn btn-primary'}><small>Dashboard</small></Link>   
                </React.Fragment>
            }
            {type === 'Proposal' && 
                <React.Fragment> 
                    <h6> Proposal Created Successfully. It will be available in the Exchange.</h6>
                    <Link to={'/proposal'} className={'text-decoration-none'}><small>Proposal</small></Link>   
                </React.Fragment>
            }
            {type === 'LProposal' && 
                <React.Fragment> 
                    <h6> You do not have registered any Proposal with us. Please create One.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Create Proposal</small></Button>   
                </React.Fragment>
            }
            {type === 'EProposal' && 
                <React.Fragment> 
                    <h6> You do not have registered any Companies with us. Please create One.  </h6>
                    <Link to={'/login'} className={'text-decoration-none'}><small>Companies</small></Link>   
                </React.Fragment>
            }
            {type === 'Purchase' && 
                <React.Fragment> 
                    <h6> You had Purchased the Dots Successfully. Continue Buying the Shares.</h6>
                    <Link to={'/proposal'} className={'text-decoration-none'}><small>Proposal</small></Link>   
                </React.Fragment>
            }
            {type === 'LPurchase1' && 
                <React.Fragment> 
                    <h6> You do not have any Purchase History. Please purchase.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Purchase Dots</small></Button>   
                </React.Fragment>
            }
            {type === 'LPurchase' && 
                <React.Fragment> 
                    <h6> Purchase feature will happen in next version. Please buy the currency in exchange outside  </h6>
                </React.Fragment>
            }
            {type === 'SSPurchase' && 
                <React.Fragment> 
                    <h6> You Have Successfully Purchased the Dots </h6>
                    <Link to={'/purchase'} className={'text-decoration-none'}><small>purchase</small></Link>   
                </React.Fragment>
            }
            {type === 'Redeem' && 
                <React.Fragment> 
                    <h6> You had Redeemed the Dots Successfully. Continue Buying the...</h6>
                    <Link to={'/proposal'} className={'text-decoration-none'}><small>Redeem</small></Link>   
                </React.Fragment>
            }
            {type === 'SSRedeem' && 
                <React.Fragment> 
                    <h6> You Have Successfully Redeemed the Dots </h6>
                    <Link to={'/redeem'} className={'text-decoration-none'}><small>redeem</small></Link>   
                </React.Fragment>
            }
            {type === 'LRedeem' && 
                <React.Fragment> 
                    <h6> You do not have any Redeem History. Please redeem.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Redeem Dots</small></Button>   
                </React.Fragment>
            }
            {type === 'FPurchase' && 
                <React.Fragment> 
                    <h6> Please upload company documents </h6>
                    <Link to={'/file'} className={'text-decoration-none'}><small>Documents Upload</small></Link>   
                </React.Fragment>
            }
            {type === 'PPurchase' && 
                <React.Fragment> 
                    <h6> We do not have your profile Completed. Please Complete and Redeem the Dots </h6>
                    <Link to={'/profile'} className={'text-decoration-none'}><small>profile</small></Link>   
                </React.Fragment>
            }
            {type === 'LBuy' && 
                <React.Fragment> 
                    <h6> Our Exchange is Empty. Please browse next time  </h6> 
                </React.Fragment>
            }
            {type === 'EBuy' && 
                <React.Fragment> 
                    <h6> You have Successfully bought the shares and payment is completed.  </h6> 
                    <Link to={'/companies'} className={'text-decoration-none'}><small>companies</small></Link>  
                </React.Fragment>
            }
            {type === 'LWallet' && 
                <React.Fragment> 
                    <h6> You do not have any balance in the wallet.</h6> 
                    <Link to={'/purchase'} className={'text-decoration-none'}><small>purchase</small></Link>
                </React.Fragment>
            }
            {type === 'Bank' && 
                <React.Fragment> 
                    <h6> Bank Created Successfully.</h6>
                    <Link to={'/bank'} className={'text-decoration-none'}><small>Bank</small></Link>   
                </React.Fragment>
            }
            {type === 'GMBuy' && 
                <React.Fragment> 
                    <h6> You have made a request to open the exchange information for a company. We have received your request. we come back to you as soon as possible.  </h6>
                    <Link 
                        to={() => window.location.href} className={'btn btn-primary'} ><small>Buy</small></Link>   
                </React.Fragment>
            }
            {type === 'LBank' && 
                <React.Fragment> 
                    <h6> You do not have registered any Bank with us. Please create One.  </h6>
                    <Button className={'btn btn-primary'} onClick={() => setIndex(1)}><small>Add Bank</small></Button>   
                </React.Fragment>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {}
};
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);