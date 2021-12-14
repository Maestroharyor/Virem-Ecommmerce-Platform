import React, { useEffect, useState } from 'react';
// import WPProductRepository from '../../repositories/WP/WPProductRepository';
// import { serializeQuery } from '../../repositories/Repository';
import Link from 'next/link';
// import Spiner from '../../components/elements/common/Spiner';
import SkeletonWidgetBrands from '../../components/elements/skeletons/SkeletonWidgetBrands';
import {createURLSlug} from '../../functions/url'

const WPWidgetCategories = ({ parentCategories }) => {

    let categoryItemsView;
    if (parentCategories && parentCategories.length) {
        const items = parentCategories.filter(categoryItem => categoryItem.parent === 0).map((item) => (
            <li key={item.id}>
                <Link href={`/shop/category/${createURLSlug(item.name, item.id)}`}>
                    <a
                        className={
                              ''
                        }
                        dangerouslySetInnerHTML={{
                            __html: `${item.name}`,
                        }}></a>
                </Link>
            </li>
        ));
        categoryItemsView = (
            <ul className="ps-list--categories">
                <li>
                    <Link href="/shop">
                        <a className={''}>
                            All
                        </a>
                    </Link>
                </li>
                {items}
            </ul>
        );
    } else {
        categoryItemsView = <SkeletonWidgetBrands />;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoryItemsView}
        </aside>
    );
};

export default WPWidgetCategories;
