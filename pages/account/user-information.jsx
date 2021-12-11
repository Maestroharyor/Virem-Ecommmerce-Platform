import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import UserInformation from '../../components/partials/account/UserInformation';
import WPLayout from '../../wp-components/layouts/WPLayout';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

const UserInformationPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Information',
        },
    ];

    return (
        <WPLayoutAccount>
            <WPLayout title='User Information'>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <UserInformation />
            </div>
            </WPLayout>
        </WPLayoutAccount>

    );
};

export default UserInformationPage;
