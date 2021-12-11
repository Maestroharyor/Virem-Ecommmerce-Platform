import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import {connect} from 'react-redux'
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableOrders from './modules/TableOrders';
// import axios from 'axios';
import { oathInfo, WPDomain, WPRepository } from '../../../repositories/WP/WPRepository';
import { serializeQuery } from '../../../repositories/Repository';

function Orders (props) {
    const [orders, setOrders] = useState([])

    useEffect(()=> {
        const getOrdersEndpoint = `wp-json/wc/v3/orders?${serializeQuery({
            ...oathInfo,
            customer: props.user_id
        })}`;
    // console.log(getOrdersEndpoint)
    WPRepository.get(`${WPDomain}/${getOrdersEndpoint}`)
    .then(res=> {
        console.log(res.data)
        setOrders(res.data)
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
            active: true,
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
                            <div className="ps-page__left">
                                <AccountMenuSidebar data={accountLinks} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>My Orders</h3>
                                    </div>
                                    <div className="ps-section__content">
                                        {/* <TableOrders /> */}
                                        {orders.length === 0 ?
                                                <div className="alert alert-info" role="alert">
                                                No Orders Made Yet <Link href='/shop'><a><strong>Continue Shopping</strong></a></Link>
                                                </div>
                                        :
                                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                            {orders.filter(order => order.line_items.length >= 1).map(order => (
                                                <div className="col" key={order.id}>
                                            <div className="card">
                                            {/* <img src="static/img-ad-2.jpg" className="card-img-top" alt="..." /> */}
                                            <div className="order-card card-body">
                                                <div className="card-header">Status: {order.status} </div>
                                                {/* <h5 className="card-title">{}</h5> */}
                                                <div className="card-text py-2">{order.line_items.map(items => (
                                                    <h5 className="py-2 display-6 fw-bold" key={items.id}>{items.name}</h5>
                                                ))}</div>
                                                <div className="card-footer">
                                                    <p>Order Total: {order.total}</p>
                                                    <p>Payment: {order.payment === 'cod' ? 'Payment on Delivery' : "Credit Card" }</p>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                            ))}
                                            </div>
                                        
                                        }
                                        
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
export default connect(mapStateToProps)(Orders);
