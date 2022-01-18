import React, { Component } from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import PartialDescription from './PartialDescription';
import PartialSpecification from './PartialSpecification';
import PartialVendor from './PartialVendor';
import PartialReview from './PartialReview';
import PartialOffer from './PartialOffer';

class DefaultDescription extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Description" key="1">
                            <PartialDescription />
                        </TabPane>
                        <TabPane tab="Specification" key="2">
                            <PartialSpecification />
                        </TabPane>
                        <TabPane tab="Reviews" key="4">
                            <PartialReview />
                        </TabPane>
                        <TabPane tab="More Offers" key="6">
                            <PartialOffer />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DefaultDescription;
