import React from 'react';
import Link from 'next/link';

const ContactMap = () => (
    <div className="ps-contact-map">
        <iframe
            src="https://www.google.com/maps/embed/v1/place?q=Along+Offa+Garage.+Ilorin+Kwara+State.+&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            height={500}></iframe>
    </div>
    
);

export default ContactMap;
