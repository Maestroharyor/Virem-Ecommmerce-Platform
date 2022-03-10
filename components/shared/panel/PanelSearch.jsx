import React, { useState } from 'react';
import Router from 'next/router'
import { getProductsByKeyword } from '../../../store/product/action';
import ProductResult from '../../elements/products/ProductSearchResult';
import WPProductRepository from '../../../repositories/WP/WPProductRepository';
import { connect } from 'react-redux';
import {Spin} from 'antd';
import MobileProductSearch from '../../../components/elements/products/MobileProductSearch';

function PanelSearch () {
    const [formLoad, setFormLoad] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [productSearch, setProductSearch] = useState([])


    const handleSubmit = e => {
        e.preventDefault();
        setFormLoad(true)
        if(keyword.trim() !== ''){
          Router.push(`/search?keyword=${keyword}`);  
        }
        
    }

    const handleSearch = e => {
        setKeyword(e.target.value)
        setFormLoad(true)
        if (e.target.value !== '') {
            const skeyword = e.target.value;
            const queries = {
                    per_page: 5,
                    search: skeyword,
                }
            const products = WPProductRepository.getProducts(queries);
            products.then((result) => {
                    console.log(result)
                    setProductSearch(result.items)
                    console.log(productSearch)
                    setFormLoad(false)
            })
            
        } else {

            setFormLoad(false)
        }
    }

        
        return (
            <div className="ps-panel__search-results">
                <form
                    className="ps-form--search-mobile position-relative"
                    action="/"
                    method="get" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group--nest">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search something..."
                            onChange={e => handleSearch(e)}
                            autoFocus={true}
                        /> 
                        {formLoad && <span className="mobile ps-form__action">
                            <Spin size="medium" />
                        </span>}
                        <button>
                            <i className="icon-magnifier"></i>
                        </button>
                    </div>
                </form>
                {productSearch.length >= 1 &&
                    productSearch.map((product) => (
                        <MobileProductSearch product={product} key={product.id} />
                    ))}
            </div>
        );
}

export default connect((state) => state.product)(PanelSearch);
