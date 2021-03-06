import React from 'react';
import Head from 'next/head';
import FooterFullwidth from '../../wp-components/shared/footers/FooterFullwidth';
import WPHeaderDefault from '../../wp-components/shared/headers/WPHeaderDefault';
import WPHeaderMobile from '../../wp-components/shared/mobile/WPHeaderMobile';
import WPNavigationBottom from '../../wp-components/shared/mobile/WPNavigationBottom';
import Newsletters from '../../components/partials/commons/Newletters';
import ViremChat from '../../wp-components/shared/chat/ViremChat';

const WPLayoutFullwidth = ({ children, title }) => {
    let titleView;
    if (title !== undefined) {
        titleView = title + ' | ' + process.env.titleDescription;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }

    return (
        <div className="martfury">
            <Head>
                <title>{titleView}</title>
            </Head>
            <WPHeaderDefault />
            <WPHeaderMobile />
            <WPNavigationBottom />
            {children}
            <Newsletters />
            <FooterFullwidth />
            <ViremChat />
            {/*<SubscribePopup active={subscribe} />*/}
        </div>
    );
};

export default WPLayoutFullwidth;
