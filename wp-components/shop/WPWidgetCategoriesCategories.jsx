import React, { useEffect, useState } from 'react';
// import Router from 'next/router';
import WPProductRepository from '../../repositories/WP/WPProductRepository';
import { serializeQuery } from '../../repositories/Repository';
import Link from 'next/link';
import Spiner from '../../components/elements/common/Spiner';
import SkeletonWidgetBrands from '../../components/elements/skeletons/SkeletonWidgetBrands';
import {createURLSlug} from '../../functions/url'

const WPWidgetCategories = ({categoryname, activeID, relatedCategories }) => {
    const [loading, setLoading] = useState(true);
    const [categoryItems, setCategoryItems] = useState(null);
    // console.log(activeID);
    // async function getCategoryItems() {
        // const queries1 = {
        //     pages: 1,
        //     per_page: 100,
        // };

        // const queries2 = {
        //     pages: 2,
        //     per_page: 100,
        // };

        // const categories1 = await WPProductRepository.getProductCategories(
        //     queries1
        // );

        // const categories2 = await WPProductRepository.getProductCategories(
        //     queries2
        // );
        
        // console.log({categories1})
        // console.log({categories2})
        // const categories = categories1.items.concat(categories2.items)
        // console.log({categories})
    //     setLoading(true);
    //     let req1 = await fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100`)

    //     let req2 = await fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100&page=2`)

    //     let catreq1 = await req1.json()
    //     let catreq2 = await req2.json()
    //     // console.log({catreq1}, {catreq2})
    //     const cat = catreq1.concat(catreq2)
    //     // console.log({cat})
    //     // setCategories(cat)

    //     if (cat.length > 100) {
    //         setTimeout(function () {
    //             setLoading(false);
    //         }, 500);
    //         setCategoryItems(cat);
    //     }
    //     return cat;
    // }

    // useEffect(() => {
    //     getCategoryItems();
    //     console.log("URL Changed")
        
    // }, [activeID]);



    let categoryItemsView;
    if (relatedCategories && relatedCategories.length > 0) {

        const items = relatedCategories.map((item) => (
            <li key={item.id}>
                <Link href={`/shop/category/${createURLSlug(item.name, item.id)}`}>
                    <a
                        className={
                             activeID === item.id
                                ? 'active'
                                : ''
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
                        <a className={activeID === undefined ? 'active' : ''}>
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
            <h4 className="widget-title">Related {loading ? "" : categoryname} Categories</h4>
            {categoryItemsView}
        </aside>
    );
};

export default WPWidgetCategories;
