import React from 'react';
import Link from 'next/link';
import { getItemBySlug } from '../../../../utilities/product-helper';
import Promotion from '../../../elements/media/Promotion';
import { connect } from 'react-redux';

const HomeAds = props => {
    const { promotions } = props;
    const promotionData = getItemBySlug(
        promotions,
        'home_fullwidth_promotions'
    );
    let promotion1, promotion2;

    if (promotionData) {
        promotion1 = getItemBySlug(promotionData.items, 'footer_1');
        promotion2 = getItemBySlug(promotionData.items, 'footer_2');
    }
    return (
        <div className="ps-home-ads my-5">
            <div className="ps-container">
                <div className="row align-items-end">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop/category/Groceries-1054"
                            // redirect
                            // image={promotion1 ? promotion1.image : null}
                            image ='/static/img/banners/save-more-on-groceries.jpeg'
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <Promotion
                            link="/shop/category/phone-1055"
                            // image={promotion2 ? promotion2.image : null}
                            image ='/static/img/banners/refurbished-phones.jpeg'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default connect(state => state.media)(HomeAds);
