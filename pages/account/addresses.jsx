import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Newsletters from '../../components/partials/commons/Newletters';
import Addresses from '../../components/partials/account/Addresses';
import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Addresses',
        },
    ];
    return (
        <WPLayoutAccount>
            <WPLayout title="Address">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Addresses />
                </div>
                <Newsletters layout="container" />
            </WPLayout>
        </WPLayoutAccount>

    );
};

export default MyAccountPage;
