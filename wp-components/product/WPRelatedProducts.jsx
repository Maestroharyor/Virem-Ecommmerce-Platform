import React from 'react';
import Slider from 'react-slick';
import { carouselFullwidth } from '../../utilities/carousel-helpers';
import WPProductSelf from '../../wp-components/elements/products/WPProductSelf';
import WPProduct from '../elements/products/WPProduct';

const WPRelatedProducts = ({ products }) => {
     console.log({products})
    let productItems;
    if (products) {
        productItems = products.map((product) => (
            <div className="slide-item" key={product.id}>
                <WPProduct product={product} />
            </div>
        ));
    }

    return (
        <div className={`ps-section--default ps-related-products `}>
            <div className="ps-section__header">
                <h3>Related products</h3>
            </div>
            <div className="ps-section__content">
                <Slider
                    {...carouselFullwidth}
                    infinite={products && products.length < 7 ? false : true}
                    className="ps-carousel">
                    {productItems}
                </Slider>
            </div>
        </div>
    );
};

export default WPRelatedProducts;
