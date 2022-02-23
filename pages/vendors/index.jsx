import React from 'react';
import axios from 'axios'
import BreadCrumb from '../../components/elements/BreadCrumb';
import WPStores from '../../wp-components/store/WPStores';
import WPLayout from '../../wp-components/layouts/WPLayout';
import WPVendorRepository from '../../repositories/WP/WPVendorRepository';

export const getStaticProps = async () => {

    const WPStores = await axios.get('https://virem.learnmur.com.ng/wp-json/dokan/v1/stores?page=1&per_page=100');

    console.log(WPStores.data)

    return{
        props: {
            WPStores: WPStores.data
        },
        revalidate: 10,
    }

}

const VendorPage = (props) => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop by Vendors',
        },
    ];

    console.log(props)
    return (
        <WPLayout title="Shop by Vendors">
            <div className="ps-page--single ps-page--vendor">
                <BreadCrumb breacrumb={breadCrumb} />
                <WPStores WPStoreData={props.WPStores} />
            </div>
        </WPLayout>
    );
};

export default VendorPage;
