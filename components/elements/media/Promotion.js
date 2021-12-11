import React from 'react';
import Link from 'next/link';
import { baseUrl } from '../../../repositories/Repository';

const Promotion = ({ redirect, link, image, description }) => {
    if (image) {
        return (
            <>
            {redirect && <a className="ps-collection rounded" href={link} target="_blank" rel="noreferrer">
                    <img src={`${image}`} className="rounded" alt={description ? description : "Shop on Virem"} />
                </a>}
            {!redirect && <Link href={link}>
                <a className="ps-collection rounded">
                    <img src={`${image}`} className="rounded" alt={description ? description : "Shop on Virem"}  />
                </a>
            </Link>}
            
            </>
        );
    } else {
        return (
            <>
            {redirect && <a className="ps-collection rounded" href={link} target="_blank" rel="noreferrer">
            <img src="/static/img/not-found.jpg" className="rounded" alt={description ? description : "Shop on Virem"} />
                </a>}
            {!redirect && <Link href={link}>
                <a className="ps-collection rounded">
                <img src="/static/img/not-found.jpg" className="rounded" alt={description ? description : "Shop on Virem"} />
                </a>
            </Link>}
            <Link href={link ? link : '/shop'}>
                <a className="ps-collection rounded">
                    <img src="/static/img/not-found.jpg" alt="Virem" />
                </a>
            </Link>
            </>
        );
    }
};

export default Promotion;
