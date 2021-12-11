import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/cart/action';
import { removeCompareItem } from '../../store/compare/action';
import Link from 'next/link';
import { Rate } from 'antd';
import WPProductCart from '../../wp-components/elements/products/WPProductCart';
import WPProductCompare from '../../wp-components/elements/products/WPProductCompare';
// import {notification } from 'antd';

class WPCompare extends Component {
    constructor(props) {
        super(props);
    }

    handleAddItemToCart = (e, product) => {
        e.preventDefault();
        this.props.dispatch(addItem(product));
    };

    handleRemoveCompareItem = (e, product) => {
        e.preventDefault();
        this.props.dispatch(removeCompareItem(product));
    };

    render() {
        const { compareItems } = this.props;
        return (
            <div className="ps-compare ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Compare Product</h1>
                    </div>
                    <div className="ps-section__content">
                        {compareItems && compareItems.length === 0 ? (
                            <div className="alert alert-danger" role="alert">
                                Compare list is empty!
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table ps-table--compare">
                                    <tbody>
                                        <tr>
                                            <td className="heading" rowSpan="2">
                                                Product
                                            </td>
                                            {compareItems &&
                                            compareItems.length > 0 ? (
                                                compareItems.map((product) => (
                                                    <td key={product.id}>
                                                        <a
                                                            href="#"
                                                            onClick={(e) =>
                                                                this.handleRemoveCompareItem(
                                                                    e,
                                                                    product
                                                                )
                                                            }>
                                                            Remove
                                                        </a>
                                                    </td>
                                                ))
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                        <tr>
                                            {compareItems &&
                                            compareItems.length > 0 ? (
                                                compareItems.map((product) => (
                                                    <td key={product.id}>
                                                        <WPProductCompare
                                                            product={product}
                                                        />
                                                    </td>
                                                ))
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td className="heading">Rating</td>
                                            {compareItems &&
                                            compareItems.length > 0 ? (
                                                compareItems.map((product) => (
                                                    <td key={product.id}>
                                                        <Rate
                                                            disabled
                                                            defaultValue={4}
                                                        />
                                                    </td>
                                                ))
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td className="heading">Price</td>
                                            {compareItems &&
                                            compareItems.length > 0 ? (
                                                compareItems.map((product) => {
                                                    if (product.sale === true) {
                                                        return (
                                                            <td
                                                                key={
                                                                    product.id
                                                                }>
                                                                <h4 className="price sale">
                                                                    $
                                                                    {
                                                                        product.price
                                                                    }
                                                                    <del>
                                                                        $
                                                                        {
                                                                            product.salePrice
                                                                        }
                                                                    </del>
                                                                </h4>
                                                            </td>
                                                        );
                                                    } else
                                                        return (
                                                            <td
                                                                key={
                                                                    product.id
                                                                }>
                                                                <h4 className="price">
                                                                    ₦{' '}
                                                                    {
                                                                        product.price
                                                                    }
                                                                </h4>
                                                            </td>
                                                        );
                                                })
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td className="heading">Sold By</td>
                                            {compareItems &&
                                            compareItems.length > 0 ? (
                                                compareItems.map((product) => (
                                                    <td key={product.id}>
                                                        <Link href="/vendor/store-list">
                                                            <a>
                                                                {product.vendor}
                                                            </a>
                                                        </Link>
                                                    </td>
                                                ))
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                        <tr>
                                            <td className="heading"></td>
                                            {compareItems &&
                                            compareItems.length > 0 ? (
                                                compareItems.map((product) => (
                                                    <td key={product.id}>
                                                        <button className="ps-btn" onClick={(e)=>this.handleAddItemToCart(e, product)}>
                                                            Add To Cart
                                                        </button>
                                                    </td>
                                                ))
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.compare;
};
export default connect(mapStateToProps)(WPCompare);
