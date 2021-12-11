import React, { Component } from 'react';
import Link from 'next/link';
import { Rate } from 'antd';
import { connect } from 'react-redux';
import Rating from '../Rating';
import { formatCurrency } from '../../../utilities/product-helper';
import { isStaticData } from '../../../utilities/app-settings';
import { baseUrl } from '../../../repositories/Repository';

function MobileProductResult ({product}) {


        return (
            <div className="ps-product ps-product--wide ps-product--search-result">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a>
                            <img src={product.images.length > 1 ? `${product.images[1].src}` :    `${product.images[0].src}`} alt={product.name} />
                        </a>
                    </Link>
                </div>
                <div className="ps-product__content">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a className="ps-product__title">{product.name}</a>
                    </Link>
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount}</span>
                    </div>
                    {product.is_sale === true ? (
                        <p className="ps-product__price sale">
                            {'₦'}
                            {formatCurrency(product.price)}
                            <del className="ml-1">
                                {'₦'}
                                {formatCurrency(product.sale_price)}
                            </del>
                        </p>
                    ) : (
                        <p className="ps-product__price">
                            {'₦'}
                            {formatCurrency(product.price)}
                        </p>
                    )}
                </div>
            </div>
        )
}

export default (MobileProductResult);
