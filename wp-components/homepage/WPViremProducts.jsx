import Link from "next/link";
import {
  FaHamburger,
  FaMobile,
  FaTshirt,
  FaBriefcase,
  FaGlobeAfrica,
  FaShoppingCart,
  FaShoppingBag
} from "react-icons/fa";

const WPViremProducts = function () {
  return (
    <div className="wpviremproducts container mb-0 mb-md-5 py-1 py-md-5 text-white text-center p-0">
      <div className="d-flex flex-wrap px-4 pb-4">
        <Link href="/shop/category/236">
          <a className="d-block flex-fill products m-2 shadow-sm d-flex flex-column flex-md-row align-items-center rounded bg-light p-3">
            <FaHamburger className="s-1" />
            <p>Virem Food</p>
          </a>
        </Link>

        <a
          href="https://topup.virem.com.ng"
          target="_blank"
          className="d-block flex-fill products m-2 shadow-sm d-flex flex-column flex-md-row align-items-center rounded bg-light p-3"
          rel="noreferrer"
        >
          <FaMobile className="s-2" />
          <p>Airtime</p>
        </a>

        <a
          href="https://vendor.virem.com.ng"
          target="_blank"
          className="d-block flex-fill products m-2 shadow-sm d-flex flex-column flex-md-row align-items-center rounded bg-light p-3"
          rel="noreferrer"
        >
          <FaTshirt className="s-3" />
          <p>Start Selling</p>
        </a>

        <Link href={"/shop/category/Drinks-1027"} passHref>
          <a
            className="d-block  products m-2 shadow-sm d-flex flex-column flex-md-row align-items-center rounded bg-light p-3"
            rel="noreferrer"
          >
            <FaShoppingBag className="s-4" />
            <p>5k Products</p>
          </a>
        </Link>

        <Link href="/about-us">
          <a className="d-block flex-fill products m-2 shadow-sm d-flex flex-column flex-md-row align-items-center rounded bg-light p-3">
            <FaGlobeAfrica className="s-5" />
            <p>About Virem</p>
          </a>
        </Link>

        <Link href="/shop">
          <a className="d-block products m-2 shadow-sm d-flex flex-column flex-md-row align-items-center rounded bg-light p-3">
            <FaShoppingCart className="s-6" />
            <p>Shop Now</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default WPViremProducts;
