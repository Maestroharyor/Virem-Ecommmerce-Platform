import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import EditAddress from '../../components/partials/account/EditAddress';

import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Address',
            url: '/account/addresses',
        },
        {
            text: 'Edit address',
        },
    ];
    return (
        <WPLayoutAccount>
        <WPLayout>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <EditAddress />
            </div>
        </WPLayout>
        </WPLayoutAccount>
    );
};

export default MyAccountPage;
