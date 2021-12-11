import React from 'react';
import FormEditAddress from './modules/FormEditAddress';
import AccountMenuSidebar from './modules/AccountMenuSidebar';

function EditAddress() {
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
                                <AccountMenuSidebar data={accountLinks}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <FormEditAddress />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
}

export default EditAddress;
