const  getAccessToken = () =>{
    return sessionStorage.getItem('accessToken');
}

const addElippsis = (str,limit) =>{
    return str.length > limit ? str.substring(0,limit) + '...': str;
}

export {addElippsis}
export default getAccessToken;