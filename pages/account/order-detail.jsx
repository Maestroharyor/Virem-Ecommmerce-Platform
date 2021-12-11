import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import OrderDetail from '../../components/partials/account/OrderDetail';

import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const OrderDetailPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order Detail',
        },
    ];
    return (
        <WPLayoutAccount>
        <WPLayout>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderDetail />
            </div>
        </WPLayout>
        </WPLayoutAccount>
    );
};

export default OrderDetailPage;
