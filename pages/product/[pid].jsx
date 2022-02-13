import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
// import BreadCrumbProduct from '../../components/elements/BreadCrumbProduct';
import WPProductDetail from '../../wp-components/elements/products/WPProductDetail';
import WPProductRepository from '../../repositories/WP/WPProductRepository';
import WPHeaderProduct from '../../wp-components/shared/headers/WPHeaderProduct';
import WPRelatedProducts from '../../wp-components/product/WPRelatedProducts';
import SkeletonProductDetail from '../../components/elements/skeletons/SkeletonProductDetail';
import WPWidgetProductsSameBrand from '../../wp-components/product/WPWidgetProductsSameBrand';
import WPProductWidgets from '../../wp-components/product/WPProductWidgets';
import WPLayoutProductDetail from '../../wp-components/layouts/WPLayoutProductDetail';
import WPHeaderDefault from '../../wp-components/shared/headers/WPHeaderDefault';
import BreadCrumbProduct from '../../components/elements/BreadCrumbProduct';
import {getURLSlugID, createURLSlug} from '../../functions/url';



export const getServerSideProps = async (context) => {
    const ID = getURLSlugID(context.query.pid)
    const [WPProduct, WPPRroductVariations] = await Promise.all ([
        WPProductRepository.getProductByID(ID),
        WPProductRepository.getProductVariantsByID(ID),    ]);
    return {
        props: {product: WPProduct, variations: WPPRroductVariations, ID}
    }
}

const WPProductDetailPage = (props) => {
    // console.log(props)
    // const router = useRouter();
    // const [product, setProduct] = useState(null);
    const [productVariations, setProductVariations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true)
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [relatedProducts2, setRelatedProducts2] = useState(null);

    if(isNaN(props.ID)){
        Router.push('/404')
    }
    

   

    const getProductRelatedProducts = async () => {
        const [relatedProducts, relatedProducts2] = await Promise.all([
            WPProductRepository.getProducts({page: 1, per_page: 5, category: props.product.categories[0].id}),
            WPProductRepository.getProducts({page: 2, per_page: 7, category: props.product.categories[0].id})
        ])
        if(relatedProducts != null) setRelatedProducts(relatedProducts.items.filter(product => product.id != props.ID))
        if(relatedProducts2 != null) setRelatedProducts2(relatedProducts2.items.filter(product => product.id != props.ID))
        // setRelatedProducts2(relatedProducts2.items.filter(product => product.id != props.ID))
        // console.log({relatedProducts})
        // console.log({relatedProducts2})
    }

    useEffect(()=> {
        getProductRelatedProducts();
    }, [])

    // async function getProductOnChangeURL(url) {
    //     const nextPid = url.split('/').pop();
    //     if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
    //         // setLoading(true);
    //         await getProduct(nextPid);
    //     }
    // }

    // useEffect(() => {
    //     const { pid } = props.query;

    //     router.events.on('routeChangeStart', getProductOnChangeURL);

    //     return () => {
    //         router.events.off('routeChangeStart', getProductOnChangeURL);
    //     };
    // }, []);

    // View area
    let productView, headerView;
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        }
    ];

    const breadCrumbProduct = [
        {
            text: 'All Products',
            url: '/shop',
        },
        {
            text: props.product ? props.product.categories[0].name : 'loading...',
            url: `${props.product ? `/shop/category/${createURLSlug(props.product.categories[0].name, props.product.categories[0].id) }` : "/"}`
        },
        {
            text: props.product ? props.product.name : 'loading...',
        },
    ]
    if (props.product === null) {
        headerView = <WPHeaderDefault />;
        productView = <SkeletonProductDetail />;
    } else {
        headerView = <WPHeaderProduct product={props.product} />;
        productView = (
            <>
            {/* {console.log(props.product)} */}
            <WPProductDetail
                product={props.product}
                variations={props.variations && props.variations}
            />
            </>
        );
    }

    return (
        <WPLayoutProductDetail title={props.product ? props.product.name : 'Loading...'}>
            {headerView}
            <BreadCrumbProduct breacrumb={props.product ? breadCrumbProduct : breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            <WPProductWidgets>
                                <WPWidgetProductsSameBrand
                                    products={relatedProducts}
                                    isVariant={true}
                                    product
                                />
                            </WPProductWidgets>
                        </div>
                    </div>
                    <WPRelatedProducts products={relatedProducts2} />
                </div>
            </div>
        </WPLayoutProductDetail>
    );
};

export default connect()(WPProductDetailPage);
