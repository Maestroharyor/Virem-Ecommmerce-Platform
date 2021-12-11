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
import WPProductList from '../wp-components/homepage/WPProductList';
import WPViremProducts from '../wp-components/homepage/WPViremProducts';
import WPViremAbout from '../wp-components/homepage/WPViremAbout';
// import WPViremPartners from '../../wp-components/homepage/WPViremPartners';
// import { getBannersBySlugs, getPromotionsBySlugs } from '../../store/media/action';

const Index = (props) => {
    console.log("Index Props", props)
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const collectionsSlug = [
    //         'deal-of-the-day',
    //         'consumer-electronics',
    //         'clothings',
    //         'garden-and-kitchen',
    //         'new-arrivals-products',
    //         'fullwidth-consumer-electronic-best-seller',
    //         'fullwidth-consumer-electronic-most-popular',
    //         'fullwidth-clothing-best-sellers',
    //         'fullwidth-clothing-most-popular',
    //         'fullwidth-kitchen-most-popular',
    //         'fullwidth-kitchen-best-sellers',
    //     ];
    //     const bannerSlugs = ['banner-home-fullwidth'];
    //     const promotionSlugs = ['home_fullwidth_promotions'];
    //     dispatch(getBannersBySlugs(bannerSlugs));
    //     dispatch(getPromotionsBySlugs(promotionSlugs));
    //     dispatch(getCollections(collectionsSlug));
    // }, []);
    return (
        <>
        <WPLayoutHomeDefault title="Virem">
            <HomeBanner />
            <WPViremProducts />
            <HomeDefaultTopCategories />
            <HomeAds />
            <WPDealOfDay />
            <HomeAdsColumns />
            <WPProductList categoryID={195} title="Women's Fashion" />
            <WPProductList categoryID={193} title="Men's Fashion" />
            <WPProductList categoryID={22} title="Amazing Fashion Discounts" />
            <WPProductList categoryID={240} title="Best Phone + Gadget Deals" />
            <WPProductList categoryID={261} title="Suppliments" />
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
// export default Index;
