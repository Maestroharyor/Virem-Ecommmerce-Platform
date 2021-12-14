export const createURLSlug = (productName, productID) => {
    let slugArray = productName.split(" ");
    slugArray.push(productID);
    let slug = slugArray.join("-");
    return slug;
}

export const getURLSlugID = (url) =>  {
    let slugArray = url.split("-");
    let ID = Number(slugArray[slugArray.length - 1]);
    if(!isNaN(ID)){
        return ID
    } else{
        return null
    }
}