import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import BreadCrumb from '../../components/elements/BreadCrumb';
import { getProductsByCategory } from '../../store/product/action';
import { WPGetProducts } from '../../store/wp/action';
import ShopBanner from '../../components/partials/shop/ShopBanner';
import ShopCategories from '../../components/partials/shop/ShopCategories';
import ShopBrands from '../../components/partials/shop/ShopBrands';
import WPWidgetCategories from '../../wp-components/shop/WPWidgetCategories';
import WPWidgetBrand from '../../wp-components/shop/WPWidgetBrand';
import WPWidgetFilterByPrices from '../../wp-components/shop/WPWidgetFilterByPrices';
import WPShopProducts from '../../wp-components/shop/WPShopProducts';
import WPProductRepository from '../../repositories/WP/WPProductRepository';
import WPLayoutFullwidth from '../../wp-components/layouts/WPLayoutFullwidth';
import WPShopCategories from '../../wp-components/shop/WPShopCategories';


export const getServerSideProps = async (context) => {
    // const ID = getURLSlugID(context.query.pid)
    const [parentCategoriesReq1, parentCategoriesReq2] = await Promise.all ([
        fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100`),
        fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100&page=2`)

    ]);
    const [parentCategories1, parentCategories2] = await Promise.all([
        parentCategoriesReq1.json(), parentCategoriesReq2.json()
    ])
    const allParentCategories = parentCategories1.concat(parentCategories2)
    const parentCategories = allParentCategories.filter(categoryItem => categoryItem.parent === 0)
    return {
        props: {parentCategories}
    }
}

const WPShopPage = (props) => {
    const dispatch = useDispatch();
    dispatch(WPGetProducts({page: 1, per_page: 18}))
    // const dispatch = useDispatch();
    // const router = useRouter();
    // const [categoryName, setCategoryName] = useState(null);
    // const [products, setProducts] = useState([])

    // async function getCategory(id) {
    //     const category = await WPProductRepository.getCategoryByID(id);
    //     if (category) {
    //         setCategoryName(category.name);
    //         return category;
    //     } else {
    //         return null;
    //     }
    // }

    // async function getProductOnChangeURL(url) {
    //     const nextPid = url.split('category=').pop();
    //     if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
    //         const queries = {
    //             page: 1,
    //             per_page: 18,
    //             category: nextPid,
    //         };
    //         dispatch(WPGetProducts(queries));
    //         getCategory(nextPid);
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
    //         };
    //         dispatch(WPGetProducts(queries));

    //         if (query.category) {
    //             dispatch(getProductsByCategory(query.category));
    //             getCategory(query.category);
    //         }
    //     }

    //     router.events.on('routeChangeStart', getProductOnChangeURL);

    //     return () => {
    //         router.events.off('routeChangeStart', getProductOnChangeURL);
    //     };
    // }, [dispatch]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: "All Products"
        },
    ];


    return (
        <WPLayoutFullwidth title="All Products">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="shop ps-container">
                    {/* <ShopBanner />
                    <ShopBrands /> */}
                    {/* <WPShopCategories /> */}
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WPWidgetCategories
                                parentCategories={props.parentCategories}
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

// WPShopPage.getInitialProps = async ({ query }) => {
//     return { query: query };
// };

export default connect()(WPShopPage);
