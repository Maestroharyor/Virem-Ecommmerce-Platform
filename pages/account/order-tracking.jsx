import React from 'react';
import OrderTracking from '../../components/partials/account/OrderTracking';
import BreadCrumb from '../../components/elements/BreadCrumb';
import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const OrderTrackingPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order Tracking',
        },
    ];
    return (
        <WPLayoutAccount>
        <WPLayout title="Order Tracking">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderTracking />
            </div>
        </WPLayout>
        </WPLayoutAccount>
    );
};

export default OrderTrackingPage;
