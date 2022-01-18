import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import WPStores from '../../wp-components/store/WPStores';
import WPLayout from '../../wp-components/layouts/WPLayout';

const VendorPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop by Vendors',
        },
    ];

    return (
        <WPLayout title="Shop by Vendors">
            <div className="ps-page--single ps-page--vendor">
                <BreadCrumb breacrumb={breadCrumb} />
                <WPStores />
            </div>
        </WPLayout>
    );
};

export default VendorPage;
