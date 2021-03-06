import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';


import MenuCategoriesDropdown from '../../../components/shared/menus/MenuCategoriesDropdown';
import CurrencyDropdown from '../../../components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '../../../components/shared/headers/modules/LanguageSwicher';
import menuData from '../../../public/static/data/menu';
import HeaderMenu from '../../../components/elements/menu/HeaderMenu';

class WPNavigationDefault extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <nav className="navigation">
                <div className="ps-container">
                    <div className="navigation__left">
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="navigation__right">
                        <HeaderMenu />
                        <ul className="navigation__extra">
                            <li>
                                {/* <Link href="/vendors/become-a-vendor"> */}
                                    <a href="https://vendor.virem.com.ng" target="_blank">Become a Vendor</a>
                                {/* </Link> */}
                            </li>
                            {/* <li>
                                <Link href="/account/order-tracking">
                                    <a>Track your order</a>
                                </Link>
                            </li> */}
                            {/* <li>
                                <CurrencyDropdown />
                            </li> */}
                            {/* <li>
                                <LanguageSwicher />
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default WPNavigationDefault;
