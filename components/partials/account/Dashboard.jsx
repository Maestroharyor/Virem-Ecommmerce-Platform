import React from 'react';
import Link from 'next/link';
// import { Form, Input, Radio, DatePicker } from 'antd';
import {connect} from 'react-redux';
// import AccountMenuSidebar from './modules/AccountMenuSidebar';
// import TableNotifications from './modules/TableNotifications';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

function Dashboard (props){

            const accountLinks = [
            {
                text: 'Dashboard',
                url: '/account/dashboard',
                icon: 'icon-user',
                active: true
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
                            {/* <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                <img src={userWoo.avatar_url ? userWoo.avatar_url : '/static/img/users/1.png'} />
                                    <figure>
                                        <figcaption>Hello {props.username}</figcaption>
                                        <p>{props.email}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul>
                                        {accountLinks.map(link => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active
                                                        ? 'active'
                                                        : ''
                                                }>
                                                <Link href={link.url}>
                                                    <a>
                                                        <i
                                                            className={
                                                                link.icon
                                                            }></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link href="/account/my-account">
                                                <a>
                                                    <i className="icon-power-switch"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside> */}
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                                <div className="ps-page__dashboard">
                                    <p>
                                        Hello <strong>{props.username}</strong>!
                                    </p>
                                    <p>
                                        From your account dashboard you can view
                                        your{' '}
                                        <Link href="/account/orders">
                                            <a>recent orders</a>
                                        </Link>
                                        , manage your{' '}
                                        <Link href="/account/user-information">
                                            <a>
                                                shipping and billing addresses
                                            </a>
                                        </Link>
                                        , and{' '}
                                        <Link href="/account/user-information">
                                            <a>
                                                edit your password and account
                                                details
                                            </a>
                                        </Link>
                                        .
                                    </p>
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
export default connect(mapStateToProps)(Dashboard);
