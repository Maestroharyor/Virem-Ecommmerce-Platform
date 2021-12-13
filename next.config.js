/*
* VIrem Next Ecommerce 
* Author: Fovero Technologies

* */
// const withPlugins = require('next-compose-plugins');
// const withImages = require('next-images');

const nextSettings = {
    env: {
        title: 'Virem',
        titleDescription: 'Kwara Shop With Ease Online',
        Authkey: 'Capacitor@4920',
        VendAuthKey: 'Vendacitor@4920'
    },
    reactStrictMode: true
};

// module.exports = withPlugins([withImages(), nextSettings]);

module.exports = nextSettings;