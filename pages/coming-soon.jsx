import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WPLayout from '../wp-components/layouts/WPLayout';

function ComingSoon() {
    return (
        <WPLayout title="Coming Soon">
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content pt-3 pb-5">
                        <figure>
                            <Image src="/static/img/svg/construction.svg" alt="Coming Soon" width={700} height={500}  />
                            <h3>This Page is Coming Soon</h3>
                            <p>
                                {"We are currently constructing this page..."}
                                <br />
                                For the main time, 
                                <Link href="/shot">
                                    <a> Continue Shopping</a>
                                </Link>
                            </p>
                        </figure>
                    </div>
                </div>
            </div>
        </WPLayout>
    );
}

export default ComingSoon;
