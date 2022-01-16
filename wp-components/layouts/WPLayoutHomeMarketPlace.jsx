import React from 'react';
import Head from 'next/head';
import WPHeaderMobile from '../../wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '../../wp-components/shared/mobile/WPNavigationBottom';
// import FooterDefault from '../../components/shared/footers/FooterDefault';
import FooterFullwidth from '../../wp-components/shared/footers/FooterFullwidth';
import ViremChat from '../../wp-components/shared/chat/ViremChat';
import Newsletters from '../../components/partials/commons/Newletters';
import WPHeaderMarketPlace from '../../wp-components/shared/headers/WPHeaderMarketPlace';

const WPLayoutHomeMarketPlace = ({ children, title }) => {
    let titleView;
    if (title !== undefined) {
        titleView = title + ' | ' + process.env.title + ' - ' + process.env.titleDescription;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <div className="virem">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderMarketPlace />
            <WPHeaderMobile />
            <WPNavigationBottom />
            {/*<SubscribePopup active={subscribe} />*/}
            {children}
            <Newsletters layout="container" />
            {/* <FooterDefault /> */}
            <FooterFullwidth />
            <ViremChat />
        </div>
    );
};

export default WPLayoutHomeMarketPlace;
