import Link from "next/link";
import { FaShoppingCart, FaBoxes } from "react-icons/fa";

function WPShopLinks() {
  const links = [
    {
      title: "Vendors",
      link: "/vendors",
      icon: <FaBoxes />,
    },
    {
      title: "Category",
      link: "/category",
      icon: <FaShoppingCart />,
    },
  ];
  return (
    <div className="links__container mx-auto">
        <h3>Shop By</h3>
      {links.map((link) => (
        <Link  key={link.title} href={link.link}>
          <a className="link">
            <div className="icon">{link.icon}</div>
            <div className="desc">
                <p>{link.title}</p>
            </div>
              
              
          </a>
        </Link>
      ))}
    </div>
  );
}

export default WPShopLinks;
