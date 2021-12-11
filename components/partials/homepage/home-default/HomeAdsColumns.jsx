import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { getItemBySlug } from '../../../../utilities/product-helper';
import Promotion from '../../../elements/media/Promotion';

const HomeAdsColumns = props => {
    const { promotions } = props;
    const promotionData = getItemBySlug(
        promotions,
        'home_fullwidth_promotions'
    );
    let promotion1, promotion2, promotion3;

    if (promotionData) {
        promotion1 = getItemBySlug(promotionData.items, 'middle_1');
        promotion2 = getItemBySlug(promotionData.items, 'middle_2');
        promotion3 = getItemBySlug(promotionData.items, 'middle_3');
    }
    return (
        <div className="ps-home-ads my-0 my-md-5">
            <div className="ps-container">
                <div className="row">
                    {/* <div className="my-4 my-sm-4 my-md-4 my-lg-0 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 shadow-sms rounded">
                        <Promotion
                            redirect = {true}
                            link="/shop"
                            // image={promotion1 ? promotion1.image : null}
                            image  = '/static/img/banners/Fast-Food-Banner-530-x-285.jpg'
                        />
                    </div> */}
                    {/* <div className="pe-4 pe-lg-0 col-xl-4 col-lg-4 col-md-6 col-sm-16 col-6 shadow-sms rounded">
                        <Promotion
                            link="/shop"
                            // image={promotion2 ? promotion2.image : null}
                            image  = '/static/img/banners/Groceries-Banner-530-x-285.jpg'
                        />
                    </div> */}
                    <div className=" col-12 shadow-sms rounded">
                        <Promotion
                            link="/shop"
                            // image={promotion3 ? promotion3.image : null}
                            image  = '/static/img/banners/Helpdesk Banner.jpg'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(state => state.media)(HomeAdsColumns);
