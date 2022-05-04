import React, { Component } from "react";

import Slider from "react-slick";
import NextArrow from "../../../elements/carousel/NextArrow";
import PrevArrow from "../../../elements/carousel/PrevArrow";
import { connect } from "react-redux";
import { getItemBySlug } from "../../../../utilities/product-helper";
import Promotion from "../../../elements/media/Promotion";
import BannerItem from "../../../../components/elements/media/BannerItem";

const HomeBanner = (props) => {
  const { banners, promotions } = props;
  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const bannerData = getItemBySlug(banners, "banner-home-fullwidth");
  const promotionData = getItemBySlug(promotions, "home_fullwidth_promotions");
  let promotion1, promotion2;

  if (promotionData) {
    promotion1 = getItemBySlug(promotionData.items, "main_1");
    promotion2 = getItemBySlug(promotionData.items, "main_2");
  }

  // Views
  let bannersView;
  if (bannerData) {
    bannersView = bannerData.items.map((item) => (
      <BannerItem source={item} key={item.id} />
    ));
  }
  return (
    <div className="ps-home-banner ps-home-banner--1">
      <div className="ps-container">
        <div className="ps-section__left">
          <Slider {...carouselSetting} className="ps-carousel">
            {/* {bannersView} */}
            <BannerItem
              source="/static/img/sliders/Airtime Banner 1230 x 425.jpg"
              key={1}
              link="/coming-soon"
            />
            <BannerItem
              source="/static/img/sliders/Food Banner 1230 x 425.jpg"
              key={2}
              link="/shop"
            />
            <BannerItem
              source="/static/img/sliders/Sports Banner 1230 x 425.jpg"
              key={2}
              link="/coming-soon"
            />
            <BannerItem
              source="/static/img/sliders/Groceries Banner 867 x 416.jpg"
              key={2}
              link="/shop"
            />
          </Slider>
        </div>
        <div className="ps-section__right">
          <Promotion
            link="/shop"
            description="Fast Delivery on Virem"
            // image={promotion1 ? promotion1.image : null}
            image="/static/img/banners/Fast Delivery 530 x 245 Banner.jpg"
          />
          <Promotion
            link="https://livescores.virem.com.ng"
            redirect={true}
            description="Check Live Football Updates on Virem LiveScores"
            // image={promotion2 ? promotion2.image : null}
            image="/static/img/banners/Virem Live Score Banner 530 x 245.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default connect((state) => state.media)(HomeBanner);
