import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login, loginSuccess, registeredSuccess, logOutSuccess } from '../../../store/auth/action';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {notification } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {decodeToken, isExpired} from 'react-jwt'


const modalLogSuccess = type => {
    notification[type]({
        message: 'Welcome back',
        description: 'You have logged in successful!',
    });
};

const modalLogFailed = type => {
    notification[type]({
        message: 'Unable to Login',
        description: 'Please check if details are correct',
    });
};


function Login(props) {

    useEffect(()=> {
        if(props.isLoggedIn){
            Router.push('/')
        }
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [formLoad, setformLoad] = useState(false)
    const [showpassword, setShowPassword] = useState(false)

    const cookies = new Cookies();
 
    const handleEmail = e => {
        const newEmail = e.target.value;
        setEmail(newEmail)
    }

    const handlePass = e => {
        const newPass = e.target.value;
        setPassword(newPass)
    }

    const toggleButton = () => {
        setShowPassword(!showpassword)
    }



    const handleformSubmit = e =>{
        e.preventDefault();
        setPasswordErr('')
        setEmailErr('')
        setformLoad(true)
        // console.log({email, password})
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        if(regex.test(String(email)) !== true || password.length <= 6){
            setformLoad(false);
            if(regex.test(String(email)) === false){
                setEmailErr('Invalid Email Address')
            }

            if(regex.test(String(email)) === true){
                setEmailErr('')
            }

            if(password.length <= 6){
                setPasswordErr('Password not long enough')
            }
        } else{
            axios.post(`https://virem.learnmur.com.ng/?rest_route=/simple-jwt-login/v1/auth&email=${email}&password=${password}`, {
                        headers: {'Accept': '*/*', 
                    "Access-Control-Allow-Origin": "*"
                }})
                    .then(res => {
                        // console.log("JWT Res: ", res.data)
                        if(res.data.success){
                            // console.log("JWT: ", res.data.data.jwt)
                            const decodedJWToken = decodeToken(`${res.data.data.jwt}`)
                            const invalidToken = isExpired(`${res.data.data.jwt}`)
                            // console.log({decodedJWToken})
                            // console.log({invalidToken})

                            if(decodedJWToken.id && !invalidToken){
                            const user = {
                                user_id: decodedJWToken.id,
                                username: decodedJWToken.username,
                                email: decodedJWToken.email
                            }
                            props.dispatch(loginSuccess(user));
                            // console.log(props)
                            cookies.set('_virjt_', res.data.data.jwt, {path: '/', sameSite: 'strict', expires: new Date(new Date().getTime() + 24 * 3600 * 1000)})
                            // console.log("New cookie set: ", cookies.get('_virjt_'))
                            modalLogSuccess('success')
                            Router.back()
                            } else{
                                modalLogFailed('warning')
                                setformLoad(false)
                                
                            }
                            
                        }
                    })
                    .catch(error => {
                        // console.log(error);
                        setformLoad(false);
                        modalLogFailed('warning')
                        
                    })
            

        }

    }
    

        return (
            
            <div className="ps-my-account">
                <div className="container">
                    <form className='ps-form--account pb-5' onSubmit={e=> handleformSubmit(e)}>
                    <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content pb-5">
                                
                                <h5 className='text-center display-3'>Login to Your Account</h5>
                                
                                <div className="form-group">
                                <label className="form-label">Email Address</label>
                                    <input type="email" className='form-control' required onChange={(e)=> handleEmail(e)} />
                                    
                                </div>

                                <div className="form-group form-forgot position-relative">
                                <label className="form-label">Password</label>
                                    <div className='btn pass_check_btn' onClick={toggleButton}>
                                        {showpassword ? <AiOutlineEyeInvisible  className='password_check' />  : <AiOutlineEye  className='password_check' />}
                                    </div>
                                    <input type={showpassword ? 'text' : 'password'} required className='form-control' onChange={(e)=> handlePass(e)}/> 
                                    
                                 
                                </div>
                                <div className="d-flex justify-content-end mb-4">
                                    <Link href="/account/forgot-password"><a>Forgot Password?</a></Link>
                                </div>
                                
                                <div className="form-group submit">
                               {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth'>Login
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>Logging You In...
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </button>
                                }
  
                                </div>
                            </div>
                            {/* <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                        
                        
                        
                        
                    </form>


                </div>
            </div>
        );
    }

const mapStateToProps = state => {
    return state.auth;
};

export default connect(mapStateToProps)(Login);
