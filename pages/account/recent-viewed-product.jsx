import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import RecentViewedProducts from '../../components/partials/account/RecentViewedProducts';

import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const RecentViewedProductsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Recent Viewed Products',
        },
    ];
    return (
        <WPLayoutAccount>
            <WPLayout>
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <RecentViewedProducts />
                </div>
            </WPLayout>
        </WPLayoutAccount>

    );
};

export default RecentViewedProductsPage;
