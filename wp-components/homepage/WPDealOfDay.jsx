import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import WPProductRepository from '../../repositories/WP/WPProductRepository';
import SkeletonProduct from '../../components/elements/skeletons/SkeletonProduct';
import { carouselFullwidth } from '../../utilities/carousel-helpers';
import WPProductDealOfDay from '../../wp-components/elements/products/WPProductDealOfDay';
import CountDownSimple from '../../components/elements/CountDownSimple';

const WPDealOfDay = ({data}) => {
    // console.log(data)
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);


    // Views
    let productItemsView;

    if (data.items) {
        if (data.items && data.items.length > 0) {
            const slideItems = data.items.map((item) => (
                <WPProductDealOfDay product={item} key={item.id} />
            ));
            productItemsView = (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const tempArr = [1, 2, 3, 4, 5, 6];
        const skeletons = tempArr.map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }
    return (
        <div className="ps-deal-of-day">
            <div className="ps-container">
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3>Hottest Deals Right Now</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>Ends in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="12 31 2021, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">
                        <a>View all</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default WPDealOfDay;
