import React from 'react';
import Head from 'next/head';
import Newletters from '../../components/partials/commons/Newletters';
// import FooterDefault from '../../components/shared/footers/FooterDefault';
import FooterFullwidth from '../../wp-components/shared/footers/FooterFullwidth'
import WhatsappChat from '../../wp-components/shared/WhatsappChat'
import WPHeaderMobile from '../../wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '../../wp-components/shared/mobile/WPNavigationBottom';
import WPHeaderDefault from '../../wp-components/shared/headers/WPHeaderDefault';

const WPLayoutProductDetail = ({ children, title }) => {
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
            {/* <WPHeaderDefault /> */}
            <WPHeaderMobile />
            <WPNavigationBottom />
            {children}
            <Newletters />
            {/* <FooterDefault /> */}
            <FooterFullwidth />
            <WhatsappChat />
        </div>
    );
};

export default WPLayoutProductDetail;
