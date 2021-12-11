import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import { oathInfo, WPDomain, WPRepository } from '../../../repositories/WP/WPRepository';
import { serializeQuery } from '../../../repositories/Repository';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

function Addresses (props) {
    const [userWoo, setuserWoo] = useState({
        billing: {},
        shipping: {},
    })

        useEffect(()=>{
            const getUserEndpoint = `wp-json/wc/v3/customers/${props.user_id}?${serializeQuery({
            ...oathInfo,
        })}`;
        WPRepository.get(`${WPDomain}/${getUserEndpoint}`)
        .then(res => {
            // console.log(res)
            const userWoo = res.data
            console.log(userWoo)
            setuserWoo(userWoo);
        })
        .catch(err => {
            console.log(err)
        })


    }, [])


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
                active: true,
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
                                <AccountMenuSidebar data={accountLinks} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Billing address
                                                </figcaption>
                                                <div className="ps-block__content">

                                                    <p>
                                                        {userWoo.billing.address_1 ? userWoo.billing.address_1 : 'You Have Not Set Up This Type Of Address Yet.'}
                                                    </p>
                                                    <Link href="/account/edit-address">
                                                        <a>Edit</a>
                                                    </Link>
                                                </div>
                                            </figure>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Shipping address
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <p>
                                                    {userWoo.shipping.address_1 ? userWoo.shipping.address_1 : 'You Have Not Set Up This Type Of Address Yet.'}
                                                    </p>
                                                    <Link href="/account/edit-address">
                                                        <a>Edit</a>
                                                    </Link>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps)(Addresses);
