// import React, { useState } from 'react';

import Dashboard from '../../components/partials/account/Dashboard';
import BreadCrumb from '../../components/elements/BreadCrumb';
import WPLayout from '../../wp-components/layouts/WPLayout';
import {connect} from 'react-redux';
import WPLayoutAccount from '../../wp-components/layouts/WPLayoutAccount';

function AccountDashboard() {

        const breadcrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'My Account',
            },
        ]
            
        // console.log(this.props)
        return (
            <WPLayoutAccount>
            <WPLayout>
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadcrumb} />
                    <Dashboard />
                </div>
            </WPLayout>
            </WPLayoutAccount>
        );
}

const mapState = (state) =>{
    return state.auth
}

export default connect(mapState)(AccountDashboard);
