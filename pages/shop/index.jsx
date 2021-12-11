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

const WPShopPage = ({ query }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [categoryName, setCategoryName] = useState(null);
    const [products, setProducts] = useState([])

    async function getCategory(id) {
        const category = await WPProductRepository.getCategoryByID(id);
        if (category) {
            setCategoryName(category.name);
            return category;
        } else {
            return null;
        }
    }

    async function getProductOnChangeURL(url) {
        const nextPid = url.split('category=').pop();
        if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
            const queries = {
                page: 1,
                per_page: 18,
                category: nextPid,
            };
            dispatch(WPGetProducts(queries));
            getCategory(nextPid);
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
            };
            dispatch(WPGetProducts(queries));

            if (query.category) {
                dispatch(getProductsByCategory(query.category));
                getCategory(query.category);
            }
        }

        router.events.on('routeChangeStart', getProductOnChangeURL);

        return () => {
            router.events.off('routeChangeStart', getProductOnChangeURL);
        };
    }, [dispatch]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: categoryName ? (
                <span
                    dangerouslySetInnerHTML={{
                        __html: `${categoryName}`,
                    }}
                />
            ) : (
                'All Products'
            ),
        },
    ];

    // useEffect(()=>{

    //         axios.get('https://qsgloballimited.com/wp-json/wc/v3/products/categories?pages=1&per_page=99&consumer_key=ck_760cf18f43d39e7ba31935e728a0f3effd018d3c&consumer_secret=cs_741ea44d492487cf7b4f7af6c32a9452b73ccd25').then(response => {
    //     console.log("Response: ",response)
    //     setProducts(response)
    // }).catch(error => {
    //     console.log("Error: ", error)
    // })
    
    // }, [])


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
                                activeID={query && query.category}
                            />
                            <WPWidgetBrand />
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

WPShopPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default connect()(WPShopPage);
