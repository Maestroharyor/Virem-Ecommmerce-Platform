import React from 'react';
import WPMenuCategories from '../../../components/shared/headers/modules/WPMenuCategories';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>All Categories</span>
            </div>
            <div className="menu__content">
                <WPMenuCategories />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
