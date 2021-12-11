import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Orders from '../../components/partials/account/Orders';
import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const MyAccountOrders = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'My Orders',
        },
    ];
    return (
        <WPLayoutAccount>
            <WPLayout>
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Orders />
                </div>
            </WPLayout>
        </WPLayoutAccount>

    );
};

export default MyAccountOrders;
