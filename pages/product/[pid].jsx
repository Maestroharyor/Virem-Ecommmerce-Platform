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

const WPProductDetailPage = (props) => {
    console.log(props)
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [productVariations, setProductVariations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true)
    const [relatedProducts, setRelatedProducts] = useState(null);
    

    async function getProduct(productID) {
        const WPProduct = await WPProductRepository.getProductByID(productID);

        console.log({loading}, WPProduct)
        if (WPProduct) {
            if (WPProduct.related_ids) {
                setRelatedProducts(WPProduct.related_ids);
            }
            setProduct(WPProduct);
            if (WPProduct.variations.length > 0) {
                const WPPRroductVariations = await WPProductRepository.getProductVariantsByID(
                    productID
                );
                if (WPPRroductVariations) {
                    setProductVariations(WPPRroductVariations);
                }
            }
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
            // console.log({loading}, WPProduct)
        } else {
            await router.push('/page/page-404', '/404');
        }
        return WPProduct;
    }

    async function getProductOnChangeURL(url) {
        const nextPid = url.split('/').pop();
        if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
            // setLoading(true);
            await getProduct(nextPid);
        }
    }

    useEffect(() => {
        const { pid } = props.query;
        if (isNaN(pid)) {
            Router.push('/page/page-404');
        }

        if (props.query) {
            const collectionsParams = [
                'customer_bought',
                'shop-recommend-items',
                'widget_same_brand',
            ];
            getProduct(pid);
        }

        router.events.on('routeChangeStart', getProductOnChangeURL);

        return () => {
            router.events.off('routeChangeStart', getProductOnChangeURL);
        };
    }, []);

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
            text: 'Home',
            url: '/',
        },
        {
            text: product ? product.categories[0].name : 'loading...',
            url: `${product ? `/shop/category/${product.categories[0].id}` : "/"}`
        },
        {
            text: product ? product.name : 'loading...',
        },
    ]
    if (loading || product === null) {
        headerView = <WPHeaderDefault />;
        productView = <SkeletonProductDetail />;
        console.log({loading}, product)
        console.log("Don't Have Product")
    } else {
        headerView = <WPHeaderProduct product={product} />;
        productView = (
            <>
            {console.log(product)}
            <WPProductDetail
                product={product}
                variations={productVariations && productVariations}
            />
            </>
        );
        console.log({loading}, product)
        console.log("Have Product")
    }

    return (
        <WPLayoutProductDetail title={product ? product.name : 'Loading...'}>
            {headerView}
            <BreadCrumbProduct breacrumb={product ? breadCrumbProduct : breadCrumb} layout="fullwidth" />
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
                    <WPRelatedProducts products={relatedProducts} />
                </div>
            </div>
        </WPLayoutProductDetail>
    );
};

WPProductDetailPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default connect()(WPProductDetailPage);
