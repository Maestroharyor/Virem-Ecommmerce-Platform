import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Input, Radio, DatePicker, notification } from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';
import LazyLoad from 'react-lazyload'
import { oathInfo, WPDomain, WPRepository } from '../../../repositories/WP/WPRepository';
import { serializeQuery } from '../../../repositories/Repository';
import AccountMenuSidebar from './modules/AccountMenuSidebar';


const modalUpdateSuccess = type => {
    notification[type]({
        message: 'Update Successful',
        description: 'Your Information has been updated succesfully',
    });
};
const modalUpdateFail = type => {
    notification[type]({
        message: 'Update Failed',
        description: 'Your Information has failed to update. Please try again!',
    });
};


function UserInformation(props) {
    // console.log(props)
    const [userWoo, setuserWoo] = useState({})

        useEffect(()=>{
            const getUserEndpoint = `wp-json/wc/v3/customers/${props.user_id}?${serializeQuery({
            ...oathInfo,
        })}`;
        WPRepository.get(`${WPDomain}/${getUserEndpoint}`)
        .then(res => {
            // console.log(res)
            const userWoo = res.data
            // console.log(userWoo)
            setuserWoo(userWoo);
        })
        .catch(err => {
            // console.log(err)
        })


    }, [])


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [email, setEmail] = useState('');
    const [formLoad, setformLoad] = useState(false)




    // console.log(props)
    
    
        
        const handleformSubmit = e => {
            setformLoad(true)
            e.preventDefault();
            // console.log({firstName, lastName, phoneNum, email})
            
            // switch (firstName, lastName, phoneNum, email) {
            //     case firstName.length <= 0:
            //         setFirstName(userWoo.first_name)
            //         break;
            //     case lastName.length<= 0:
            //         setLastName(userWoo.last_name)
            //     default:
            //         break;
            // }
            if(firstName.trim().length <= 0){
                setFirstName(props.username)
            }

            if(lastName.trim().length <=0){
                setLastName(userWoo.last_name)
            }

            if(email.trim().length <= 0){
                setEmail(props.email)
            }


            const body = {
                first_name: firstName,
                last_name: lastName,
                billing: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email.length === 0 ? props.email : email,
                    phone: phoneNum
                },
                shipping: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email.length === 0 ? props.email : email,
                    phone: phoneNum
                }
            }

            // console.log(JSON.stringify(body))
            const bodyjson = JSON.stringify(body)
            const updateUserEndpoint = `wp-json/wc/v3/customers/${props.user_id}?${serializeQuery({
            ...oathInfo,
        })}`;
            axios.put(`${WPDomain}/${updateUserEndpoint}`, bodyjson, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            })
            .then(res => {
                console.log(res)
                modalUpdateSuccess('success')
                setformLoad(false)
                
            })
            .catch(err => {
                setformLoad(false)
                modalUpdateFail('warning')
                // console.log(err)
                // console.log(err.message)
            })

        }

            const accountLinks = [
            {
                text: 'Dashboard',
                url: '/account/dashboard',
                icon: 'icon-user',
            },
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
                active: true
            },
            {
                text: 'Orders',
                url: '/account/orders',
                icon: 'icon-papers',
            },
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
                icon: 'icon-store',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];

        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <AccountMenuSidebar data={accountLinks}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">


                            <form className='ant-form ant-form-horizontal ps-form--account-setting' onSubmit={e=> handleformSubmit(e)}>
                            <div className="ps-form__header"><h3>Account Information</h3></div>
                            <div className="ps-form__content">

                                <div className="form-group">
                                <label className="form-label">First Name</label>
                                    <input type="text" className='form-control'  onChange={(e)=> setFirstName(e.target.value)}  placeholder={props.username} />
                                </div>

                                <div className="form-group">
                                <label className="form-label">Last Name</label>
                                    <input type="text" className='form-control'  onChange={(e)=> setLastName(e.target.value)}  placeholder={userWoo.last_name? userWoo.last_name : ''} />
                                </div>

                                <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                    <input type="tel" className='form-control'  onChange={(e)=> setPhoneNum(e.target.value)}  placeholder={userWoo.billing ? userWoo.billing.phone : ''} />
                                </div>

                                
                                <div className="form-group">
                                <label className="form-label">Email Address</label>
                                    <input type="email" className='form-control'  onChange={(e)=> setEmail(e.target.value)}  placeholder={props.email} />
                                    
                                </div>

                                
                                <div className="form-group submit">
                               {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth'>Update
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>Updating your Information...
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </button>
                                }
  
                                </div>
                            </div>
                        
                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}

const mapStateToProps = state => {
    return state.auth
}

export default connect(mapStateToProps)(UserInformation);
