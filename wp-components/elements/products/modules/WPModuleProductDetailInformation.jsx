import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { formatCurrency } from '../../../../utilities/product-helper';
import { addItem } from '../../../../store/cart/action';
import ModuleProductDetailSharing from '../../../../components/elements/detail/modules/elements/ModuleProductDetailSharing';
import {AiOutlineWhatsApp} from 'react-icons/ai'
import {
    WPProductDetailBrandView,
    WPProductDetailCategoriesView,
    WPProductDetailRatingView,
    WPProductDetailShortDescView,
    WPProductDetailTagsView,
} from '../../../../utilities/WPHelpers';
import ReactWhatsapp from 'react-whatsapp';

const WPModuleProductDetailInformation = ({ product, children, variant }) => {
    // console.log(product)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        let tempProduct = product;
        tempProduct.quantity = quantity;
        dispatch(addItem(product));
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (this.state.quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleBuyNow = (e) =>{
        handleAddItemToCart(e)
        Router.push('/account/checkout')
    }

    const handleRenderPrice = (product) => {
        let priceView;
        if (product.on_sale === true) {
            priceView = (
                <p className="ps-product__price sale">
                    <span>₦</span>
                    {formatCurrency(
                    product.sale_price
                        ? product.sale_price
                        : product.regular_price
                )}
                    {product.regular_price && <del className="ml-2">
                        <span>₦</span>
                        {formatCurrency(product.regular_price)}
                    </del>}
                </p>
            );
        } else {
            priceView = (
                <p className="ps-product__price">
                    <span>₦</span>
                    {formatCurrency(
                    product.sale_price
                        ? product.sale_price
                        : product.regular_price
                )}
                </p>
            );
        }
        return priceView;
    };
    // Views
    const ratingView = WPProductDetailRatingView(product);
    const shortDescView = WPProductDetailShortDescView(product);
    const brandView = WPProductDetailBrandView(product);
    const categoriesView = WPProductDetailCategoriesView(product);
    const tagsView = WPProductDetailTagsView(product);
    let productPriceView, productVendorView;

    if (product) {
        if (variant) {
            productPriceView = handleRenderPrice(variant);
        } else {
            productPriceView = handleRenderPrice(product);
        }

        if (product.store) {
            productVendorView = (
                <p>
                    Sold By:
                    <Link href={`/store/${product.store.id}`}>
                        <a className="ml-2">
                            <strong> {product.store.shop_name}</strong>
                        </a>
                    </Link>
                </p>
            );
        }
    }

    return (
        <div className="ps-product__info">
            <h1>{product.name}</h1>
            <div className="ps-product__meta">
                {brandView}
                {ratingView}
            </div>
            {productPriceView}

            <div className="ps-product__desc">
                {productVendorView}
                {shortDescView}
            </div>
            {children}
            <div className="ps-product__shopping">
                <figure>
                    <figcaption>Quantity</figcaption>
                    <div className="form-group--number">
                        <button className="up" onClick={handleIncreaseItemQty}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button
                            className="down"
                            onClick={handleDecreaseItemQty}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={quantity}
                            disabled
                        />
                    </div>
                </figure>
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={handleAddItemToCart}>
                    Add to cart
                </a>
                <a className="ps-btn" href="#" onClick={handleBuyNow}>
                    Buy Now
                </a>

                {/* <a className='btn btn-success'> <AiOutlineWhatsApp /> Purchase on WhatsApp</a> */}
            </div>
            <div class="whatsapp--checkout d-grid gap-2 mb-5">
                <ReactWhatsapp number="+2348087614841" class="btn btn-success"  message={`Hello, I would like to purchase ${product.name}`}>
                <AiOutlineWhatsApp  />
                Checkout on WhatsApp
                </ReactWhatsapp>

            </div>
            <div className="ps-product__specification">
                <Link href="/contact-us">
                    <a className="report">Report Abuse</a>
                </Link>
                {/* <p>
                    <strong>SKU:</strong> SF1133569600-1
                </p> */}
                <p className="categories">
                    <strong> Categories:</strong>
                    {categoriesView}
                </p>
                <p className="tags">
                    <strong>Tags: </strong>
                    {tagsView}
                </p>
            </div>
            <ModuleProductDetailSharing />
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.cart;
};
export default connect(mapStateToProps)(WPModuleProductDetailInformation);
