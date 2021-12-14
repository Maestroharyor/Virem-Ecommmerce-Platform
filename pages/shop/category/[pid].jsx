import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import Router from 'next/router';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import { getProductsByCategory } from '../../../store/product/action';
import { WPGetProducts } from '../../../store/wp/action';
import ShopBanner from '../../../components/partials/shop/ShopBanner';
import ShopCategories from '../../../components/partials/shop/ShopCategories';
import ShopBrands from '../../../components/partials/shop/ShopBrands';
import WPWidgetCategoriesCategories from '../../../wp-components/shop/WPWidgetCategoriesCategories';
import WPWidgetBrand from '../../../wp-components/shop/WPWidgetBrand';
import WPWidgetFilterByPrices from '../../../wp-components/shop/WPWidgetFilterByPrices';
import WPShopProducts from '../../../wp-components/shop/WPShopProducts';
import WPProductRepository from '../../../repositories/WP/WPProductRepository';
import WPLayoutFullwidth from '../../../wp-components/layouts/WPLayoutFullwidth';
import WPShopCategories from '../../../wp-components/shop/WPShopCategories';
import { oathInfo, WPDomain, WPRepository } from '../../../repositories/WP/WPRepository';
import { serializeQuery } from '../../../repositories/Repository';
import {getURLSlugID} from '../../../functions/url'


export const getServerSideProps = async (context) => {
    const ID = getURLSlugID(context.query.pid)
    const [WPCategory, relatedCategoriesReq1, relatedCategoriesReq2] = await Promise.all ([
        WPProductRepository.getCategoryByID(ID),
        fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100`),
        fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100&page=2`)

    ]);
    const [relatedCategories1, relatedCategories2] = await Promise.all([
        relatedCategoriesReq1.json(), relatedCategoriesReq2.json()
    ])
    const allRelatedCategories = relatedCategories1.concat(relatedCategories2)
    const relatedCategories = allRelatedCategories.filter(categoryItem => categoryItem.id == ID || categoryItem.parent == ID)
    return {
        props: {category: WPCategory,  relatedCategories, ID}
    }
}


const WPShopCategory = (props) => {
    // console.log(props)
    const dispatch = useDispatch();
    dispatch(WPGetProducts({page: 1, per_page: 18,category: props.ID,}))
    if(isNaN(props.ID) || props.category == null){
        Router.push('/404')
    }
    // const router = useRouter();
    // const [categoryName, setCategoryName] = useState(null);
    // const [products, setProducts] = useState([])
 

    // async function getCategory(id) {
    //     const category = await WPProductRepository.getCategoryByID(query.pid);
    //     if (category) {
    //         // console.log(category)
    //         setCategoryName(category.name);
    //         return category;
    //     } else {
    //         // console.log("NOpe")
    //         return null;
    //     }
    // }

    // async function getProductOnChangeURL(url) {
    //     // const nextPid = url.split('category=').pop();
    //     const nextPid = query.pid
    //     if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
    //         const queries = {
    //             page: 1,
    //             per_page: 18,
    //             category: query.pid,
    //         };
    //         dispatch(WPGetProducts(queries));
    //         getCategory(query.pid);
    //     } else {
    //         const queries = {
    //             page: 1,
    //             per_page: 18,
    //         };
    //         dispatch(WPGetProducts(queries));
    //     }
    // }

    // useEffect(() => {
    //     if (query) {
    //         const queries = {
    //             page: 1,
    //             per_page: 18,
    //             category: query.pid,
    //         };
    //         dispatch(WPGetProducts(queries));

    //         if (query.pid) {
    //             dispatch(getProductsByCategory(query.pid));
    //             getCategory(query.pid);
    //         }
    //     }
    //     getProductOnChangeURL()

    //     // router.events.on('routeChangeStart', getProductOnChangeURL);

    //     // return () => {
    //     //     router.events.off('routeChangeStart', getProductOnChangeURL);
    //     // };
    // }, [query]);

    let breadCrumb;

    if (props.category === null){
        breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'All Products'
            },
        ];
    } else{
        breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'All Products',
                url: '/shop',
            },
            {
                text:<span
                        dangerouslySetInnerHTML={{
                            __html: `${props.category.name}`,
                        }}
                    />
                
            },
        ];
    }
    


    return (
        <WPLayoutFullwidth title={props.category !== null ? props.category.name : "All Products"}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="shop ps-container">
                    {/* <ShopBanner />
                    <ShopBrands /> */}
                    {/* <WPShopCategories /> */}
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WPWidgetCategoriesCategories
                                activeID={props.ID} categoryname = {props.category.name} relatedCategories={props.relatedCategories}
                            />
                            {/* <WPWidgetBrand /> */}
                            {/* <WPWidgetFilterByPrices /> */}
                        </div>
                        <div className="ps-layout__right">
                            <WPShopProducts />
                        </div>
                    </div>
                </div>
            </div>
          
        </WPLayoutFullwidth>
        
    );
};

// WPShopCategory.getInitialProps = async ({ query }) => {
//     return { query: query };
// };

export default connect()(WPShopCategory);
