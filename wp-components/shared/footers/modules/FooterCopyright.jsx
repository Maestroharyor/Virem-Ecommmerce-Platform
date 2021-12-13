import React from 'react';

const FooterCopyright = () => (
    <div className="ps-footer__copyright">
        <p>© {new Date().getFullYear()} Virem. All Rights Reserved | Crafted by <a className='hov' href="https://foverotechnologies.com" target="_blank" rel="noreferrer dofollow">Fovero Digital Technologies</a></p>
        <p>
            <span>Payment Methods:</span>
            <a href="#">
                <img src="/static/img/payment.webp" alt="Payment Methods" />
            </a>
        </p>
    </div>
);

export default FooterCopyright;
