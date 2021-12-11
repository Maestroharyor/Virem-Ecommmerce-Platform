import React, { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
// import categories from '../../../public/static/data/static-categories.json';

const { SubMenu } = Menu;

const PanelCategories = (props) => {


    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    const [openKeys, setOpenkeys] = useState(['sub1'])

    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenkeys({ openKeys });
        } else {
            setOpenkeys(
                {
                    openKeys: latestOpenKey ? [latestOpenKey] : [],
                } 
            )
        }
    };


        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}>
                {props.categories.filter(cat => cat.parent == 0).map(category => (
                    <Menu.Item key={category.id}>
                        <Link href={`/shop/category/${category.id}`}>
                            <a onClick={props.handleDrawerClose}>
                            {category.name}
                            </a>
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        );
    
}

export default PanelCategories;
