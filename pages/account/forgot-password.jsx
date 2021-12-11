import React from 'react';
import BreadCrumb from '../../components/elements/BreadCrumb';
import WPLayout from '../../wp-components/layouts/WPLayout';
import ResetPassword from '../../components/partials/account/ResetPassword';

const ForgotPass = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Password Reset',
        },
    ];
    return (
        <WPLayout title="Forgot Password">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ResetPassword />
            </div>
        </WPLayout>
    );
};

export default ForgotPass;
