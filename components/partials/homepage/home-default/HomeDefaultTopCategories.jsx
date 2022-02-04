import React from 'react';
import Link from 'next/link';
import Slider from "react-slick";
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa'

function NextArrow(props) {
  return (
    <div className='homecategories__nav_next p-3 shadow-sm border  border-white' onClick={props.onClick}>
    <FaAngleRight />
    </div>
  );
}

function PrevArrow(props) {
  return (
    <div className='homecategories__nav_prev p-3 shadow-sm border  border-white' onClick={props.onClick}>
    <FaAngleLeft />
    </div>
  );
}


const HomeDefaultTopCategories = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            // initialSlide: 4
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ],
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    
    return(
    <div className="ps-top-categories">
        <div className="ps-container">
            <h3 className='text-white'>Top categories of the month</h3>
             <Slider {...settings} className='homecategories__slider position-relative'>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Foods-1018`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/9.jpg" alt="Shop on Virem" />
                        <p>Foods</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Electronics-567`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/1.jpg" alt="Shop on Virem" />
                        <p>Electronics</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Clothing-35`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/2.jpg" alt="Shop on Virem" />
                        <p>Clothings</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Computers-981`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/3.jpg" alt="Shop on Virem" />
                        <p>Computers</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Home-and-Kitchen-666`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/4.jpg" alt="Shop on Virem" />
                        <p>Home & Kitchen</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Health-&amp;-Beauty-25`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/5.jpg" alt="Shop on Virem" />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Men-Fashion-921`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/6.jpg" alt="Shop on Virem" />
                        <p>{"Men's Fashion"}</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Computing-1036`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/7.jpg" alt="Shop on Virem" />
                        <p>Technology</p>
                    </div>
                </div>
                <div className="">
                    <div className="ps-block--category bg-white">
                        <Link href={`/shop/category/Mobile-Phones-918`}>
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/8.jpg" alt="Shop on Virem" />
                        <p>Mobile Phones</p>
                    </div>
                </div>
             </Slider>
        </div>
    </div>
)};

export default HomeDefaultTopCategories;
