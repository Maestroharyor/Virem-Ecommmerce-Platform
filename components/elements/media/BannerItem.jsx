import React from 'react';
import Link from 'next/link';
import { baseUrl } from '../../../repositories/Repository';
import { FaLinkedin } from 'react-icons/fa';

const BannerItem = ({ source, redirect, link }) => {
    if (source) {
        return (
            <>
            {redirect &&
            <a href={link} target="_blank" rel="noreferrer" className="ps-banner-item--default bg--cover" 
                    style={{
                        backgroundImage: `url('${source}')`,
                    }}>
                    {/*<img src={`${baseUrl}${source.image.url}`} alt="martfury" />*/}
                </a>
             }
            {!redirect && <Link href={link}>
                 <a className="ps-banner-item--default bg--cover"
                    style={{
                        backgroundImage: `url('${source}')`,
                    }}>
                    
                </a>
            </Link>
            }
            </>
        );
    } else {
        return (
            <>
            {redirect &&
            <a href={link} target="_blank" rel="noreferrer" className="ps-collection" >
                    <img src="/static/img/not-found.jpg" alt={link} />
                    {/*<img src={`${baseUrl}${source.image.url}`} alt="martfury" />*/}
                </a>
            }
            {!redirect && <Link href={link}>
                    <a className="ps-banner-item--default bg--cover">
                    <img src="/static/img/not-found.jpg" alt="Virem" />
                    {/*<img src={`${baseUrl}${source.image.url}`} alt="martfury" />*/}
                </a>
            </Link>
            }
            </>
        );
    }
};

export default BannerItem;
