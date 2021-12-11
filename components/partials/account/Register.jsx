import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login, loginSuccess, registeredSuccess, logOutSuccess } from '../../../store/auth/action';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {notification } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FaLessThanEqual } from 'react-icons/fa';


const modalRegSuccess = type => {
    notification[type]({
        message: 'Welcome to Virem | Logging you In',
        description: 'Your account has been created successfully!',
    });
};

const modalRegFailed = type => {
    notification[type]({
        message: 'Unable to Create Account',
        description: 'Check if details are correct or email already exists',
    });
};


function Register(props) {
    useEffect(()=> {
        if(props.isLoggedIn){
            Router.push('/')
        }
    }, [])

    // console.log(props)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [formLoad, setformLoad] = useState(false)
    const [showpassword, setShowPassword] = useState(false)


    const cookies = new Cookies();

    const handleFirstName = e => {
        const newName = e.target.value;
        setFirstName(newName)
    }

    const handleLastName = e => {
        const newLName = e.target.value;
        setLastName(newLName)
    }

    const handlePhoneNum = e => {
        const newPhone = e.target.value;
        setPhoneNum(newPhone)
    }

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

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     // this.props.form.validateFields((err, values) => {
    //     //     if (!err) {
    //     //         this.props.dispatch(login());
    //     //         Router.push('/account/login');
    //     //     } else {
    //     //     }
    //     // });
    // };

    const handleformSubmit = e =>{
        e.preventDefault();
        // console.log(props)
        setPasswordErr('')
        setEmailErr('')
        setformLoad(true)
        // console.log({firstName, lastName, phoneNum, email, password})
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
            axios.post(`https://virem.learnmur.com.ng/?rest_route=/simple-jwt-login/v1/users&email=${email}&password=${password}&display_name=${`${firstName} ${lastName}`}&user_login=${firstName}&AUTH_KEY=${process.env.Authkey}`, {
                headers: {'Accept': '*/*', 
            "Access-Control-Allow-Origin": "*"}})
            .then(response => {
                // console.log("UserDetails: ",response.data.user)
                if(response.data.success){
                    const resUser = response.data.user
                    const user = {
                        user_id: resUser.ID,
                        username: resUser.user_login,
                        email: resUser.user_email
                    }
                    // console.log("User Dets: ", user)
                    props.dispatch(registeredSuccess(user));
                    modalRegSuccess('success');
                    // console.log(props)

                    axios.post(`https://virem.learnmur.com.ng/?rest_route=/simple-jwt-login/v1/auth&email=${email}&password=${password}`, {
                        headers: {'Accept': '*/*', 
                    "Access-Control-Allow-Origin": "*"
                }})
                    .then(res => {
                        // console.log("JWT Res: ", res.data)
                        if(res.data.success){
                            // console.log("JWT: ", res.data.data.jwt)
                            cookies.set('_virjt_', res.data.data.jwt, {path: '/', sameSite: 'strict', expires: new Date(new Date().getTime() + 24 * 3600 * 1000)})
                            // console.log("New cookie set: ", cookies.get('_virjt_'))
                            // console.log(props)
                            setformLoad(false)
                            Router.push('/account/user-information')
                        }
                    })
                    .catch(error => {
                        // console.log(error);
                        modalRegFailed('danger')
                        setformLoad(false);
                    })


                }
            
            })
            .catch(err => {
                // console.log("Error: ", err)
                modalRegFailed('warning')
                setformLoad(false)
        })
        }

        // e.target.reset()
    }
    

        return (
            
            <div className="ps-my-account">
                <div className="container">
                    <form className='ps-form--account  pb-5' onSubmit={e=> handleformSubmit(e)}>
                    <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content pb-5">
                                
                                <h5 className='text-center'>Register An Account</h5>

                                <div className="form-group">
                                <label className="form-label">First Name</label>
                                    <input type="text" className='form-control' required onChange={(e)=> handleFirstName(e)} />
                                </div>

                                <div className="form-group">
                                <label className="form-label">Last Name</label>
                                    <input type="text" className='form-control' required onChange={(e)=> handleLastName(e)} />
                                </div>
{/* 
                                <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                    <input type="tel" className='form-control' required onChange={(e)=> handlePhoneNum(e)} />
                                </div> */}

                                
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
                                
                                <div className="form-group submit">
                               {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth'>Register
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>Creating your account...
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

export default connect(mapStateToProps)(Register);
