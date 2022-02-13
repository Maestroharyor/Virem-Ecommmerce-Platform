import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import PartialSpecification from '../../../../components/elements/detail/modules/description/PartialSpecification';
import PartialVendor from '../../../../components/elements/detail/modules/description/PartialVendor';
import PartialReview from '../../../../components/elements/detail/modules/description/PartialReview';
import PartialOffer from '../../../../components/elements/detail/modules/description/PartialOffer';
import {WPRepository, WPDomain, ck_username, cs_password} from '../../../../repositories/WP/WPRepository'
import {serializeQuery} from '../../../../repositories/Repository'
const { TabPane } = Tabs;

const WPModuleDefaultDescription = ({product})=>  {

    const [reviews, setReviews] = useState([]);
    useEffect(async ()=> {
        WPRepository.get(`${WPDomain}/wp-json/wc/v3/products/reviews?${serializeQuery(
            {consumer_key: ck_username,
            consumer_secret: cs_password}
        )}`, {headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': '*',
        }})
        .then(res=>{
            console.log(res.data)
            setReviews(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    let descView;
    if (product && product.description.length > 0) {
        if (product.description) {
            descView = <div className="ps-document">
                <div dangerouslySetInnerHTML={{
                    __html: `${product.description}`,
                }}>
                </div>
            </div>
        }
    }
    else {
        descView = <p><i>{"This product hasn't any further description."}</i></p>
    }


    // console.log(product.description)
    return (
        <div>
            <div className="ps-product__content ps-tab-root">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Description" key="1">
                        {descView}
                    </TabPane>
                    {/* <TabPane tab="Specification" key="2">
                        <PartialSpecification />
                    </TabPane> */}
                    <TabPane tab="Vendor" key="3">
                        <PartialVendor store = {product.store} />
                    </TabPane>
                    <TabPane tab="Reviews" key="4">
                        <PartialReview id={product.id} reviews={reviews} setReview={setReviews} />
                    </TabPane>
                    <TabPane tab="More Offers" key="6">
                        <PartialOffer />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default WPModuleDefaultDescription;
