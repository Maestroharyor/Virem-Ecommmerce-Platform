import React from "react";
import Link from 'next/link';
import BreadCrumb from '../components/elements/BreadCrumb';
import WPLayoutFullwidth from '../wp-components/layouts/WPLayoutFullwidth';
import {createURLSlug} from '../functions/url';
import {MdShoppingCart} from 'react-icons/md'

export const getStaticProps = async () => {
    let [req1, req2] = await Promise.all([
        fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100`), await fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100&page=2`)
    ])

    let [catreq1, catreq2] = await Promise.all([
        req1.json(),req2.json()
    ])
    // console.log({catreq1}, {catreq2})
    const cats = catreq1.concat(catreq2)
    const category = cats.filter(cat => cat.parent === 0 && cat.name !== "Free delivery")
  return {
    props: {category},
    revalidate: 10
  };
};

function ShopByCategory(props) {
    console.log(props)

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: "Shop By Category"
        },
    ];
  return (
    <WPLayoutFullwidth title="Shop by Category">
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <div className="shop ps-container">
            <div className="shop_by_category d-flex flex-wrap flex-column flex-sm-row justify-content-between mx-auto py-5">
                {props.category.map(category => (
                    <Link key={category.id}  href={`/shop/category/${createURLSlug(category.name, category.id)}`} passHref>
                        <a className='link d-flex flex-column'>
                            <div className="icon">
                                <MdShoppingCart />
                            </div>
                            <p className="title">{category.name}</p>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </WPLayoutFullwidth>
  );
}

export default ShopByCategory;
