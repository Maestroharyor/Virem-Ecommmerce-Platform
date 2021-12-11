import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/cart/action';
import { removeWishlistItem } from '../../store/wishlist/action';
import WPProductCart from '../../wp-components/elements/products/WPProductCart';
import AccountMenuSidebar from '../../components/partials/account/modules/AccountMenuSidebar';

const WPWishlist = (props) => {


    const handleAddItemToCart = (e, product) => {
        props.dispatch(addItem(product));
    };

    const handleRemoveWishListItem = (e, product) => {
        e.preventDefault();
        props.dispatch(removeWishlistItem(product));
    };


        const { wishlistItems } = props;
        // console.log(wishlistItems);
        const accountLinks = [
            {
                text: 'Dashboard',
                url: '/account/dashboard',
                icon: 'icon-user',
            },
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            {
                text: 'Orders',
                url: '/account/orders',
                icon: 'icon-papers',
            },
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
                icon: 'icon-store',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
                active: true,
            },
        ];

        // views
        let wishlistView;
        if (wishlistItems && wishlistItems.length > 0) {
            const items = wishlistItems.map((product) => (
                <tr key={product.id}>
                    <td>
                        <WPProductCart product={product} />
                    </td>
                    <td className="price">${product.price}</td>
                    <td>{product.store.name}</td>
                    <td>
                        <a
                            className="ps-btn ps-btn--sm mr-2"
                            href=""
                            onClick={(e) =>
                                handleAddItemToCart(e, product)
                            }>
                            Add to cart
                        </a>
                    </td>
                    <td>
                        <a
                            href="#"
                            onClick={(e) =>
                                handleRemoveWishListItem(e, product)
                            }>
                            <i className="icon-cross"></i>
                        </a>
                    </td>
                </tr>
            ));
            wishlistView = (
                <div className="table-responsive">
                    <table className="table ps-table--whishlist">
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Unit Price</th>
                                <th>Vendor</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{items}</tbody>
                    </table>
                </div>
            );
        } else {
            wishlistView = (
                <div className="alert alert-danger" role="alert">
                    Wishlist is empty!
                </div>
            );
        }
        return (
            // <div className="ps-section--shopping ps-whishlist">
            //     <div className="container">
            //         <div className="ps-section__header">
            //             <h1>Wishlist</h1>
            //         </div>
            //         <div className="ps-section__content">{wishlistView}</div>
            //     </div>
            // </div>
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-page__left">
                                <AccountMenuSidebar data={accountLinks} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>My Wishlists</h3>
                                    </div>
                                    <div className="ps-section__content">
                                    {wishlistView}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

}
const mapStateToProps = (state) => {
    return state.wishlist;
};
export default connect(mapStateToProps)(WPWishlist);
