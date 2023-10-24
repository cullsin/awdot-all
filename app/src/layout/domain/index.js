import React, {useState} from 'react';
import './index.scss';
import showSvg from '../../asset/images/ew-login-layout.svg';
import {Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import logoSvg from '../../asset/images/domain/logo.svg';
import headerSvg from '../../asset/images/domain/header-illustration.svg';
import detailSvg from '../../asset/images/domain/details-1.svg';
import quoteSvg from '../../asset/images/domain/quotes.svg';
import project1Svg from '../../asset/images/domain/project-1.jpg';
import project2Svg from '../../asset/images/domain/project-2.jpg';
import project3Svg from '../../asset/images/domain/project-3.jpg';
import decorationSvg from '../../asset/images/domain/decoration-lines.svg';
import decorationCitySvg from '../../asset/images/domain/decoration-city.svg';
import testi1Svg from '../../asset/images/domain/testimonial-1.jpg';
import testi2Svg from '../../asset/images/domain/testimonial-2.jpg';
import testi3Svg from '../../asset/images/domain/testimonial-3.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Helmet } from 'react-helmet'

const AddCss = React.lazy(() => import('../../asset/css/styles.css'));


const DashboardLayout = (props) => {
    const [show, setShow] = useState(false);
    return (
    <>    
    <AddCss />
    <Helmet>
    </Helmet>
    <nav id="navbarExample" className="navbar navbar-expand-lg fixed-top navbar-light bg-light" aria-label="Main navigation">
        <div className="container">
            <a className="navbar-brand logo-image" href="index.html"><img src={logoSvg} alt="alternative" /></a> 
            <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav ms-auto navbar-nav-scroll">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#header">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#about">about</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#services">services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#pricing">documents</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#pricing">pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#pricing">testimonials</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#pricing">partners</a>
                    </li>
                </ul>
                <span className="nav-item">
                    <a className="btn-solid-sm" href="#contact">contact</a>
                </span>
            </div>
        </div> 
    </nav> 
    <header id="header" className="header">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-xl-5">
                    <div className="text-container">
                        <div className="section-title">Welcome to Zinc web agency</div>
                        <h1 className="h1-large">Zinc creates stylish and efficient sites</h1>
                        <p className="p-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim, neque ut ultrices sollicitudin</p>
                        <a className="btn-solid-lg" href="#services">Offered services</a>
                        <a className="quote" href="#contact"><i className="fas fa-paper-plane"></i>Get quote</a>
                    </div>
                </div> 
                <div className="col-lg-6 col-xl-7">
                    <div className="image-container">
                        <img className="img-fluid" src={headerSvg} alt="alternative" />
                    </div> 
                </div> 
            </div> 
        </div> 
    </header>
    
    <div id="services" className="cards-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="card pb-5">
                        <div className="card-icon blue">
                            <span className="far fa-file-alt"></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Landing page</h5>
                            <p>Lorem ipsum dolor sit amet, consect adipiscing elit nulla id nisl blah nor</p>
                            <ul className="list-unstyled li-space-lg">
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Ut tincidunt vitae enim non vehi</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Phasellus vitae metus in felis</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Fusce pulvinar eu mi ac molestie</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Curabitur consequat nisl eget</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    

                    
                    <div className="card pb-5">
                        <div className="card-icon yellow">
                            <span className="fas fa-solar-panel"></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Corporate site</h5>
                            <p>Nam eu erat tellused vivamus vitae sem in tortor pharetra vehicula orn</p>
                            <ul className="list-unstyled li-space-lg">
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Vivaus dignissim sit amet nisi</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Aliqam a tristique nibh in pretium</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Nunc commodo magna quis blah</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Lacus fermentum tincidunt</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    

                    
                    <div className="card pb-5">
                        <div className="card-icon red">
                            <span className="fas fa-gift"></span>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Online shop</h5>
                            <p>Nullam lobortis porta diam, vitae dictum metus placerat luctus bora</p>
                            <ul className="list-unstyled li-space-lg">
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Sed laoreet blandit mollis ne</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Mauris non luctus est quisquerm</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Mattis dapibus quisque tristique</div>
                                </li>
                                <li className="d-flex">
                                    <i className="fas fa-check"></i>
                                    <div className="flex-grow-1">Cursus lacus interdum sollicdn</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    

                </div> 
            </div> 
        </div> 
    </div> 
    
    <div id="details" className="basic-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-xl-7">
                    <div className="image-container">
                        <img className="img-fluid" src={detailSvg} alt="alternative" />
                    </div> 
                </div> 
                <div className="col-lg-6 col-xl-5">
                    <div className="text-container">
                        <h2><span>Perfect solution</span><br/> for your small business </h2>
                        <p>Maecenas fringilla quam posuere, pellentesque est nec, gravida turpis. Integer vitae mollis felis. Integer id quam id tellus hendrerit laciniad binfer</p>
                        <p>Sed id dui rutrum, dictum urna eu, accumsan turpis. Fusce id auctor velit, sed viverra dui rem dina</p>
                        <a className="btn-solid-reg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Modal</a>
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 
    
	<div id="projects" className="filter bg-gray">
		<div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="h2-heading">Projects that we're proud of</h2>
                </div> 
            </div> 
            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="button-group filters-button-group">
                        <button className="button is-checked" data-filter="*">ALL</button>
                        <button className="button" data-filter=".design">DESIGN</button>
                        <button className="button" data-filter=".development">DEVELOPMENT</button>
                        <button className="button" data-filter=".marketing">MARKETING</button>
                    </div> 
                    <div className="grid">
                        <div className="element-item development">
                            <a href="article.html">
                                <img className="img-fluid" src={project1Svg} alt="alternative" />
                                <p><strong>Online banking</strong> - pellentesque tincidunt leo eu laoreedt integer quis vanos compren</p>
                            </a>
                        </div>
                        <div className="element-item development">
                            <a href="article.html">
                                <img className="img-fluid" src={project2Svg} alt="alternative" />
                                <p><strong>Loans company</strong> - odio semper, interdum orci molestie, mattis lectus pellentesq aliqu</p>
                            </a>
                        </div>
                        <div className="element-item development">
                            <a href="article.html">
                                <img className="img-fluid" src={project3Svg} alt="alternative" />
                                <p><strong>Refinance firm</strong> - arcu a neque congue finibus doneci malesuada et purus melan bris</p>
                            </a>
                        </div>
                    </div> 
                </div> 
            </div> 
		</div> 
    </div> 
    <div className="slider-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">

                    
                    <div className="slider-container">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                            <Swiper 
                            slidesPerView={3}
                            spaceBetween={10}
                            pagination={{
                              clickable: true,
                            }}
                            modules={[Pagination]}
                            >
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi1Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi1Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi1Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi1Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi1Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi1Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className="card pb-5">
                                        <img className="quotes" src={quoteSvg} alt="alternative" />
                                        <div className="card-body">
                                            <p className="testimonial-text">Fusce tincidunt dui nec diam varius venenatis. Nullam tristique rutrum odio, ut tincidunt erat dictum in. Etiam et aliquet mi, et vehicula elit fusce porta ullamcorper</p>
                                            <div className="details">
                                                <img className="testimonial-image" src={testi2Svg} alt="alternative" />
                                                <div className="text">
                                                    <div className="testimonial-author">Samantha Bloom</div>
                                                    <div className="occupation">Team Leader - Syncnow</div>
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>

    <div id="pricing" className="cards-2">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="h2-heading"><span>Choose the package</span><br/> that fits your budget and project</h2>
                </div> 
            </div> 
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <img className="decoration-lines" src={decorationSvg} alt="alternative" />
                                <span>Landing page</span>
                                    <img className="decoration-lines flipped" src={decorationSvg} alt="alternative" />
                            </div>
                            <ul className="list-unstyled li-space-lg">
                                <li>Fusce pulvinar eu mi acm</li>
                                <li>Curabitur consequat nisl bro</li>
                                <li>Reget facilisis molestie</li>
                                <li>Vivamus vitae sem in tortor</li>
                                <li>Pharetra vehicula ornares</li>
                                <li>Vivamus dignissim sit amet</li>
                                <li>Ut convallis aliquama set</li>
                            </ul>
                            <div className="price">$200</div>
                            <a href="#contact" className="btn-outline-reg">Get quote</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <img className="decoration-lines" src={decorationSvg} alt="alternative" />
                                <span>Corporate site</span>
                                    <img className="decoration-lines flipped" src={decorationSvg} alt="alternative" />
                            </div>
                            <ul className="list-unstyled li-space-lg">
                                <li>Nunc commodo magna quis</li>
                                <li>Lacus fermentum tincidunt</li>
                                <li>Nullam lobortis porta diam</li>
                                <li>Announcing of invita mro</li>
                                <li>Dictum metus placerat luctus</li>
                                <li>Sed laoreet blandit mollis</li>
                                <li>Mauris non luctus est</li>
                            </ul>
                            <div className="price">$300</div>
                            <a href="#contact" className="btn-outline-reg">Get quote</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <img className="decoration-lines" src={decorationSvg} alt="alternative" />
                                <span>Online shop</span><img className="decoration-lines flipped" src={decorationSvg} alt="alternative" />
                            </div>
                            <ul className="list-unstyled li-space-lg">
                                <li>Quisque rutrum mattis</li>
                                <li>Quisque tristique cursus lacus</li>
                                <li>Interdum sollicitudin maec</li>
                                <li>Quam posuere, pellentesque</li>
                                <li>Est nec, gravida turpis integer</li>
                                <li>Mollis felis. Integer id quam</li>
                                <li>Id tellus hendrerit lacinia</li>
                            </ul>
                            <div className="price">$400</div>
                            <a href="#contact" className="btn-outline-reg">Get quote</a>
                        </div>
                    </div>
                </div>    
                </div> 
            </div>
               
    </div>
    
    <div className="basic-2">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-container">
                        <h4>In gravida at nunc sodales pretium. Vivamus semper, odio vitae mattis auctor, elit elit semper magna rico</h4>
                        <p className="p-large">Ac tristique velit sapien vitae eros. Praesent ut erat a tellus cursus pharetra finibus posuere nisi. Vivamus feugiat tincidunt sem pre toro</p>
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 
    
    <div id="contact" className="form-1">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="h2-heading"><span>Use the following form to</span><br/> request a quote for your project</h2>
                    <p className="p-heading">Vel malesuada sapien condimentum nec. Fusce interdum nec urna et finibus pulvinar tortor id</p>
                    <ul className="list-unstyled li-space-lg">
                        <li><i className="fas fa-map-marker-alt"></i> &nbsp;22 Praesentum, Pharetra Fin, CB 12345, KL</li>
                        <li><i className="fas fa-phone"></i> &nbsp;<a href="tel:00817202212">+81 720 2212</a></li>
                        <li><i className="fas fa-envelope"></i> &nbsp;<a href="mailto:lorem@ipsum.com">lorem@ipsum.com</a></li>
                    </ul>
                </div> 
            </div> 
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    
                    
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control-input" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control-input" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <select className="form-control-select" required>
                                <option className="select-option" value="" disabled selected>Project type</option>
                                <option className="select-option" value="Company Website">Company Website</option>
                                <option className="select-option" value="Landing Page">Landing Page</option>
                                <option className="select-option" value="Online Shop">Online Shop</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control-textarea" placeholder="Message" required></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control-submit-button">Submit</button>
                        </div>
                    </form>
                    

                </div> 
            </div> 
        </div> 
    </div> 
    
    <div className="footer bg-gray">
        <img className="decoration-city" src={decorationCitySvg} alt="alternative" />
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h4>Pellentesque aliquet mi eu tortor dictum, non imperdiet ante viverra. Phasellus eget enim orci ut pellentes troc</h4>
                    <div className="social-container">
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-facebook-f fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-twitter fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-pinterest-p fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-instagram fa-stack-1x"></i>
                            </a>
                        </span>
                        <span className="fa-stack">
                            <a href="#your-link">
                                <i className="fas fa-circle fa-stack-2x"></i>
                                <i className="fab fa-youtube fa-stack-1x"></i>
                            </a>
                        </span>
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>   
    
    <div className="copyright bg-gray">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <ul className="list-unstyled li-space-lg p-small">
                        <li><a href="article.html">Article Details</a></li>
                        <li><a href="terms.html">Terms & Conditions</a></li>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                    </ul>
                </div> 
                <div className="col-lg-3">
                    <p className="p-small statement">Copyright © <a href="#">Your name</a></p>
                </div> 
                <div className="col-lg-3">
                    <p className="p-small statement">Distributed By: <a href="https://themewagon.com/" target="_blank">ThemeWagon</a></p>
                </div> 
            </div> 
        </div> 
    </div>  
    
    </>
    );
}

export default DashboardLayout;