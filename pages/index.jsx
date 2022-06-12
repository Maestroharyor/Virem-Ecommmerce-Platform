// import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import SiteFeatures from '../components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '../components/partials/homepage/home-default/HomeAdsColumns';
import HomeAds from '../components/partials/homepage/home-default/HomeAds';
import DownLoadApp from '../components/partials/commons/DownLoadApp';
import Newletters from '../components/partials/commons/Newletters';
import HomeDefaultTopCategories from '../components/partials/homepage/home-default/HomeDefaultTopCategories';
// import { getCollections } from '../../store/collection/action';
import WPLayoutHomeDefault from '../wp-components/layouts/WPLayoutHomeDefault';
// import WPNewArrivals from '../../wp-components/homepage/WPNewArrivals';
import WPDealOfDay from '../wp-components/homepage/WPDealOfDay';
import WPProductListHome from '../wp-components/homepage/WPProductListHome';
import WPViremProducts from '../wp-components/homepage/WPViremProducts';
import WPViremAbout from '../wp-components/homepage/WPViremAbout';
import WPShopLinks from '../wp-components/homepage/WPShopLinks';
// import WPViremPartners from '../wp-components/homepage/WPViremPartners';
// import { getBannersBySlugs, getPromotionsBySlugs } from '../../store/media/action';
import WPProductRepository from '../repositories/WP/WPProductRepository';



export async function getStaticProps(context) {
    const page = 1;
    const per_page =  7;
    const [dealsReq, genReq
        // menReq, fashionReq, phoneReq, supplimentsReq
    ] = await  Promise.all([
        WPProductRepository.getProducts({page, per_page: 12}),
        WPProductRepository.getProducts({page, per_page, category: 1052}),
        // WPProductRepository.getProducts({page, per_page, category: 193}),
        // WPProductRepository.getProducts({page, per_page, category: 22}),
        // WPProductRepository.getProducts({page, per_page, category: 240}),
        // WPProductRepository.getProducts({page, per_page, category: 261}),
    ])

    console.log(dealsReq.items.length
        )

    return {
      props: {
          dealsReq, 
          genReq, 
        //   menReq, 
        //   fashionReq, phoneReq, supplimentsReq
        }, // will be passed to the page component as props
        revalidate: 10,
    }
  }
  


const Index = (props) => {
    // console.log("Index Props", props)

    return (
        <>
        <WPLayoutHomeDefault title="Virem">
            <HomeBanner />
            <WPViremProducts />
            <HomeDefaultTopCategories />
            <HomeAds />
            <WPDealOfDay data={props.dealsReq} />
            <WPShopLinks />
            <HomeAdsColumns />
            <WPProductListHome 
            // categoryID={195}
             title="Latest Products" categoryID={1052} data={props.genReq.items} />
            {/* <WPProductListHome categoryID={193} title="Men's Fashion" data={props.menReq.items} />
            <WPProductListHome categoryID={22} title="Amazing Fashion Discounts" data={props.fashionReq.items} />
            <WPProductListHome categoryID={240} title="Best Phone + Gadget Deals" data={props.phoneReq.items} />
            <WPProductListHome categoryID={261} title="Suppliments" data={props.supplimentsReq.items} /> */}
            <DownLoadApp />
            {/* <WPNewArrivals /> */}
            {/* <WPViremAbout /> */}
            {/* <WPViremPartners /> */}
            <SiteFeatures />
            <Newletters />
            
        </WPLayoutHomeDefault>
        </>
    );
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Index);
