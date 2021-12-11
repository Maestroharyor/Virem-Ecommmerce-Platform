import React from 'react';

import BreadCrumb from '../../components/elements/BreadCrumb';
// import Wishlist from '../../components/partials/account/Wishlist';
import WPLayout from '../../wp-components/layouts/WPLayout';
import WPWishlist from '../../wp-components/account/WPWishlist';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const WishlistPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Wishlist',
        },
    ];
    return (
        <WPLayoutAccount>
        <WPLayout title="Wishlist">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <WPWishlist />
            </div>
        </WPLayout>
        </WPLayoutAccount>

    );
};

export default WishlistPage;
