import React, {useState} from 'react';
import {connect} from 'react-redux'
import {notification} from 'antd'
import { oathInfo, WPDomain, WPRepository } from '../../../../repositories/WP/WPRepository';
import { serializeQuery } from '../../../../repositories/Repository';
import axios from 'axios'

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



function FormEditAddress (props) {

    const [formLoad, setformLoad] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [postcode, setPostcode] = useState('')


    const handleformSubmit = e =>{
        setformLoad(true)
        e.preventDefault();

        const body = {
    first_name: props.username,
    billing: {
    first_name: firstName,
    last_name: lastName,
    company: company,
    address_1: address,
    state: state,
    postcode: postcode,
    country: country,
    email,
    phone: phoneNum },

    shipping: {
    first_name: firstName,
    last_name: lastName,
    company: company,
    address_1: address,
    state: state,
    postcode: postcode,
    country: country,
    email,
    phone: phoneNum
    }
    }
    // console.log(JSON.stringify(body, null, 2))
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
                // console.log(res)
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



        return (
            <form className="ps-form--edit-address" onSubmit={e => handleformSubmit(e)}>
                <div className="ps-form__header">
                    <h3>Billing address</h3>
                </div>
                <div className="ps-form__content">
                    <div className="form-group">
                        <label>
                            First Name <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Last Name <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Company Name
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setCompany(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Country <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setCountry(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Street Address <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setAddress(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            State <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setState(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Postcode <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setPostcode(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Email address <sup className="required">*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group submit">
                        {/* <button className="ps-btn">Save Address</button> */}
                                {!formLoad ?
                                 <button type="submit"className='ps-btn ps-btn--fullwidth'>Save Address
                                 </button>
                                : 
                                <button type="submit"className='ps-btn ps-btn--fullwidth form-load-disabled' disabled>Saving Billing Information...
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                </button>
                                }
                    </div>
                </div>
            </form>
        );
}

const mapStateToProps = state => {
    return state.auth
}

export default connect(mapStateToProps)(FormEditAddress);
