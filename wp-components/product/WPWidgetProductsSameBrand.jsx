import React from 'react';
import WPProductSelf from '../../wp-components/elements/products/WPProductSelf';
import WPProduct from '../elements/products/WPProduct';

const WPWidgetProductsSameBrand = ({ products }) => {
    console.log(products)
    let productItemsView;
    if (products) {
        productItemsView = products.map((product) => {
            return <WPProduct product={product} />
            // if (index < 2) {
            //     return <WPProductSelf productID={item} key={index} />;
            // }
        });
    } else {
        productItemsView = <p>{
            setTimeout(()=> {
                return "No product found."
            }, 1000)
            
            }</p>;
    }
    return (
        <aside className="widget widget_same-brand">
            <h3>Same Brand</h3>
            <div className="widget__content">{productItemsView}</div>
        </aside>
    );
};

export default WPWidgetProductsSameBrand;
