import React from 'react';
import Link from 'next/link';
import { WPProductThumbnailView } from '../../../utilities/WPHelpers';
import {createURLSlug} from '../../../functions/url';
const WPProductCompare = ({ product }) => {
    // Views
    const thumbnailImage = WPProductThumbnailView(product);
    return (
        <div className="ps-product--compare">
            <div className="ps-product__thumbnail">
            <Link href={`/product/${createURLSlug(product.name, product.id)}`}>
                    <a>{thumbnailImage}</a>
                </Link>
            </div>
            <div className="ps-product__content">
            <Link href={`/product/${createURLSlug(product.name, product.id)}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
            </div>
        </div>
    );
};

export default WPProductCompare;
