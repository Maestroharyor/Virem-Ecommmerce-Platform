import React from 'react';
import Link from 'next/link';
import {
    WPGetProductBadge,
    WPGetProductImage,
    WPGetProductPrice,
    WPProductThumbnailView,
} from '../../../utilities/WPHelpers';
import Rating from '../../../components/elements/Rating';
import {createURLSlug} from '../../../functions/url';

const WPProductSearchResult = ({ product }) => {
    // Views

    let productPriceView, productBadgeView;
    const thumbnailImage = WPProductThumbnailView(product);
    if (product) {
        productPriceView = WPGetProductPrice(product);
    }

    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
            <Link href={`/product/${createURLSlug(product.name, product.id)}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href={`/product/${createURLSlug(product.name, product.id)}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
                <div className="ps-product__rating">
                    <Rating />
                    {/* <span>{Math.floor(Math.random() * 10) + 1}</span> */}
                </div>
                {productPriceView}
            </div>
        </div>
    );
};

export default WPProductSearchResult;
