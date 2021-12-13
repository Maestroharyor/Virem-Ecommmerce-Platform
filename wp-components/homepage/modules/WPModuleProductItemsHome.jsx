import React from 'react';
import { carouselFullwidth } from '../../../utilities/carousel-helpers';
import WPProduct from '../../elements/products/WPProduct';
import Slider from 'react-slick';

const WPModuleProductItemsHome = (props) => {
    // console.log(props)
    return (
        <Slider
            {...carouselFullwidth}
            infinite={props.products.length > 7 ? true : false}
            className="ps-carousel outside">
            {props.products.map((product) => (
                <div className="item" key={product.id}>
                    <WPProduct product={product} />
                </div>
            ))}
        </Slider>
    );
};

export default WPModuleProductItemsHome;
