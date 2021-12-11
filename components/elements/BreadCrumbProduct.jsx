import React from 'react';
import Link from 'next/link';

const BreadCrumbProduct = ({ breacrumb, layout }) => {
    return (
        <div className="ps-breadcrumb">
            <div
                className={
                    layout === 'fullwidth' ? 'ps-container' : 'container'
                }>
                <ul className="breadcrumb">
                    {breacrumb.map(item => {
                        if (!item.url) {
                            return <li key={item.text}>{item.text}</li>;
                        } else {
                            return (
                                <li key={item.text}>
                                    {/* <Link href={item.url}> */}
                                        <a href={item.url}>{item.text}</a>
                                    {/* </Link> */}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BreadCrumbProduct;
