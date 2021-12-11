import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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

const WPShopCategory = ({ query }) => {
    // console.log(query.pid)
    const dispatch = useDispatch();
    const router = useRouter();
    const [categoryName, setCategoryName] = useState(null);
    const [products, setProducts] = useState([])
 

    async function getCategory(id) {
        const category = await WPProductRepository.getCategoryByID(query.pid);
        if (category) {
            // console.log(category)
            setCategoryName(category.name);
            return category;
        } else {
            // console.log("NOpe")
            return null;
        }
    }

    async function getProductOnChangeURL(url) {
        // const nextPid = url.split('category=').pop();
        const nextPid = query.pid
        if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
            const queries = {
                page: 1,
                per_page: 18,
                category: query.pid,
            };
            dispatch(WPGetProducts(queries));
            getCategory(query.pid);
        } else {
            const queries = {
                page: 1,
                per_page: 18,
            };
            dispatch(WPGetProducts(queries));
        }
    }

    useEffect(() => {
        if (query) {
            const queries = {
                page: 1,
                per_page: 18,
                category: query.pid,
            };
            dispatch(WPGetProducts(queries));

            if (query.pid) {
                dispatch(getProductsByCategory(query.pid));
                getCategory(query.pid);
            }
        }
        getProductOnChangeURL()

        // router.events.on('routeChangeStart', getProductOnChangeURL);

        // return () => {
        //     router.events.off('routeChangeStart', getProductOnChangeURL);
        // };
    }, [query]);

    let breadCrumb;

    if (categoryName === null){
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
                            __html: `${categoryName}`,
                        }}
                    />
                
            },
        ];
    }
    


    return (
        <WPLayoutFullwidth title={categoryName !== null ? categoryName : "All Products"}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="shop ps-container">
                    {/* <ShopBanner />
                    <ShopBrands /> */}
                    {/* <WPShopCategories /> */}
                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WPWidgetCategoriesCategories
                                activeID={query && query.pid} categoryname = {categoryName}
                            />
                            {/* <WPWidgetBrand /> */}
                            <WPWidgetFilterByPrices />
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

WPShopCategory.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default connect()(WPShopCategory);
