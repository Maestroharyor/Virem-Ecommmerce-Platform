import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

function RecentViewedProducts (props) {
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
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
                icon: 'icon-store',
                active: true
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
                            <section className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <p>No product here.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        );
}

const mapStateToProps = state => {
    return state.auth
}

export default connect(mapStateToProps)(RecentViewedProducts);
