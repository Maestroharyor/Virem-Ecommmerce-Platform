

import axios from 'axios';

export const WPDomain = 'https://virem.learnmur.com.ng';

export const ck_username = 'ck_c668c1163da91eb89e1259706dd1946c453fcfe6';
export const cs_password = 'cs_bf89ac8ae81243d599f93324c4ad517990e6d02f';

export const oathInfo = {
    consumer_key: ck_username,
    consumer_secret: cs_password,
};

export const customHeaders = {
    Accept: '*/*'
};

export const WPRepository = axios.create({
    headers: customHeaders,
});

