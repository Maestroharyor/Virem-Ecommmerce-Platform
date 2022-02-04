import React from 'react';
import Link from 'next/link';


const PartialVendor = ({store}) => (
    <section>
        {/* <h4>{store.}</h4> */}
        <Link href={`/store/${store.id}`}>
            <a className="ml-2">
                <h4> {store.shop_name}</h4>
            </a>
        </Link>
        <p>
            {store.address.street_1}
        </p>
        <Link href={`/store/${store.id}`}>
            <a className="btn btn-primary btn-lg" style={{color: "#fff"}}>See more Products from {store.shop_name}</a>
        </Link>
        
    </section>
);

export default PartialVendor;
