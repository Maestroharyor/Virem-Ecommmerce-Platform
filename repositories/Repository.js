import axios from 'axios';
const baseDomain = 'https://virem.learnmur.com.ng';
export const wp = 'https://virem.learnmur.com.ng';

const authorization_prefix = 'Bearer ';

export const customHeaders = {
    "Accept": 'application/json',
    "Access-Control-Allow-Origin": "*"
    /* Authorization: authorization_prefix + token || undefined*/
    /*auth: {
        "username": "ck_dc45d73b9a8b2931930de4a5eb2b2d520c8ba566",
        "password": "cs_e3c6ca23aca7a6350b490e5969cdfa9b11703a42"
    }*/
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
