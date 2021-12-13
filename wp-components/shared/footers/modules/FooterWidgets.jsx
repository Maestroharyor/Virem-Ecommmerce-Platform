import React from 'react';
import Link from 'next/link';

const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us</h4>
            <div className="widget_content">
                <p>Call us 24/7</p>
                <h3>+234807200976</h3>
                <p>
                M.J Shopping Complex beside First Bank, Ajase Ipo road. Along Offa Garage. Ilorin Kwara State. <br />
                    <a href="mailto:contact@martfury.co">contact@virem.com.ng</a>
                </p>
                <ul className="ps-list--social">
                    <li>
                        <a className="facebook" href="#">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a className="twitter" href="#">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a className="google-plus" href="#">
                            <i className="fa fa-google-plus"></i>
                        </a>
                    </li>
                    <li>
                        <a className="instagram" href="#">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">About Virem</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/about-us">
                        <a>About Us</a>
                    </Link>
                </li>

                <li>
                    <Link href="/contact-us">
                        <a>Contact Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/faqs">
                        <a>FAQs</a>
                    </Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions">
                        <a>Term & Conditions</a>
                    </Link>
                </li>
                <li>
                    <Link href="/privacy-policy">
                        <a>Privacy Policy</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Account</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/account/dashboard">
                        <a>My Dashboard</a>
                    </Link>
                </li>
                <li>
                    {/* <Link href="/vendors/become-a-vendor"> */}
                        <a href="https://vendor.virem.com.ng" target="_blank" rel="noreferrer" >Become a Vendor</a>
                    {/* </Link> */}
                </li>
                <li>
                    <Link href="/account/order-tracking">
                        <a>My Orders</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/contact-us">
                        <a>Track My Orders</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Helpful Links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/blog">
                        <a>Our Blog</a>
                    </Link>
                </li>
                <li>
                    <Link href="/vendors">
                        <a>Find Stores</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a>All Products</a>
                    </Link>
                </li>
            </ul>
        </aside>
                <aside className="widget widget_footer">
            <h4 className="widget-title">Shopping</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/shop">
                        <a>Deals of the Day</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop/category/379">
                        <a>Free Delivery</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop/category/236">
                        <a>Foods</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop/category/22">
                        <a>Fashion</a>
                    </Link>
                </li>
            </ul>
        </aside>
    </div>
);

export default FooterWidgets;
