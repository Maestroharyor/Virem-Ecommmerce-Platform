import {useState, useEffect} from 'react';
import menuData from '../../../../public/static/data/menu.json';
import WPMenu from '../../../elements/menu/WPMenu';
import axios from 'axios';


const WPMenuCategories = () => {
    const [categories, setCategories] = useState([])

    const fetchData = async () => {
        // console.log("Mounted")
        // axios.get(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100`, {
        //     headers: {'Accept': '*/*'
        // }})
        // .then(res => {
        //     // console.log(res.data)
        //     setCategories(res.data)
        //     console.log("1",categories)
        // })
        // .then(
        //     axios.get(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100&page=2`, {
        //         headers: {'Accept': '*/*'
        //     }})
        //     .then(res2 => {
        //         const res1 = categories
        //         const finalCat = res1.concat(res2.data)
        //         // console.log({finalCat})
        //         setCategories(finalCat)
        //         console.log("2", categories)
        //     })
        // )
        // .catch(err => {
        //     console.log(err)
        // })

        let req1 = await fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100`)

        let req2 = await fetch(`https://virem.learnmur.com.ng/wp-json/wc/v3/products/categories?consumer_key=ck_c668c1163da91eb89e1259706dd1946c453fcfe6&consumer_secret=cs_bf89ac8ae81243d599f93324c4ad517990e6d02f&per_page=100&page=2`)

        let catreq1 = await req1.json()
        let catreq2 = await req2.json()
        // console.log({catreq1}, {catreq2})
        const cat = catreq1.concat(catreq2)
        // console.log({cat})
        setCategories(cat)

        
    }
    useEffect(()=> {
        if(categories.length <=101){
           fetchData() 
        }
        
    })

    // categories.map(cat => {
    //     console.log(cat, cat.id)
    // })

    // if(categories.length <=100){
    //     fetchData()
    // }

    return (
    <WPMenu data={categories} className="menu--dropdown" />
    )
};

export default WPMenuCategories;
