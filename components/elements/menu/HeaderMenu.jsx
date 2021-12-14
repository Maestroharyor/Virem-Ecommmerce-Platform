import React from 'react';
import Link from 'next/link';

import MegaMenu from './MegaMenu';
import MenuDropdown from './MenuDropdown';
import {createURLSlug} from '../../../functions/url'

const Menu = (props) => {
    const topMenu = [
        {
            name: "Browse Products",
            link: "/shop",
            isCategory: false
        },
        {
            name: "Foods",
            id: 1018,
            isCategory: true
        },
        {
            name: "Fashion",
            id: 22,
            link: "/shop",
            isCategory: true
        },
        {
            name: "Beauty and Body Care",
            id: 25,
            isCategory: true
        },
        {
            name: "Phones and Tablets",
            id: 240,
            isCategory: true
        },
    ]
    
    return (<ul className={"menu"}>
        {topMenu.map(item => (
                        <li key={item.name}>
                                {/* <Link href={``}>
                                    <a>{item.text}</a>
                                </Link> */}
                                {
                                    !item.isCategory ? 
                                    <Link href={item.link}>
                                        <a>{item.name}</a>
                                    </Link>
                                    :
                                    <Link href={`/shop/category/${createURLSlug(item.name, item.id)}`}>
                                        <a>{item.name}</a>
                                    </Link>
                                }
                        </li>
                    ))}
    </ul>
)};

export default Menu;
