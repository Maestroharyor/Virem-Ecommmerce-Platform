import {useState} from 'react';
import Link from 'next/link';

const WPMenu = (props) => {
    // const [parentCatID, setParentCatID] = useState()
    // console.log("Parent Categories:", props.data.filter(item => item.parent === 0))
    const filteredSubCategory = (id) => {
        return props.data.filter(submenu => submenu.parent === id)
    }
    return (    
    <ul className={"menu--dropdown"}>
        {props.data.length !== 0 && props.data.map(item => {
            if(item.parent === 0 && item.name !== "Free delivery"){
                return(
                    <li key={item.id} className="menu-item-has-children has-mega-menu">
                        <Link href={`/shop/category/${item.id}`} passHref>
                            <a>{item.name}</a>
                        </Link>
                        <div className="mega-menu">
                            <div className="mega-menu__column">
                                <ul className="mega-menu__list">
                                    {
                                        filteredSubCategory(item.id).slice(0,8).map(link => (
                                            <li key={item.id}>
                                                <Link href={`/shop/category/${link.id}`} passHref>
                                                    <a>{link.name}</a>
                                                </Link>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                            {filteredSubCategory(item.id).length > 8 &&
                                <div className="mega-menu__column">
                                <ul className="mega-menu__list">
                                    {
                                        filteredSubCategory(item.id).slice(7,16).map(link => (
                                            <li key={item.id}>
                                                <Link href={`/shop/category/${link.id}`} passHref>
                                                    <a>{link.name}</a>
                                                </Link>
                                            </li>
                                        ))
                                    }
                            

                                </ul>
                            </div>
                            }

                            {filteredSubCategory(item.id).length > 16 &&
                                <div className="mega-menu__column">
                                <ul className="mega-menu__list">
                                    {
                                        filteredSubCategory(item.id).slice(15,24).map(link => (
                                            <li key={item.id}>
                                                <Link href={`/shop/category/${link.id}`} passHref>
                                                    <a>{link.name}</a>
                                                </Link>
                                            </li>
                                        ))
                                    }
                            

                                </ul>
                            </div>
                            }
                        </div>
                    </li>
                )
            }
        })}
    </ul>
    )
}

export default WPMenu;
