let apiHost = ''; // ENV参数没有时，使用mock地址
let jsHost = '';
let volumeLink = '';
let shopLink = '';
if (process.env.ENV === 'dev') {
    apiHost = 'https://sit-operation.allcitygo.com/';
    jsHost = 'https://sit-operation.allcitygo.com:8763/';
    volumeLink = 'https://sit-operation.allcitygo.com/hangzhoutong/#/index'
    shopLink = 'https://sit-operation.allcitygo.com/shoppingMall/#/goodDetail'
}

if (process.env.ENV === 'test') {
    apiHost = 'http://marketing.allcitygo.com/';
    jsHost = 'http://datatrack.allcitygo.com/';
}

if (process.env.ENV === 'beta') {
    apiHost = '//gateway.beta.apitops.com/';
}

if (process.env.ENV === 'v5') {
    apiHost = 'http://marketing.allcitygo.com/';
    jsHost = 'http://datatrack.allcitygo.com/';
}

if (process.env.ENV === 'release') {
    apiHost = 'https://operation.allcitygo.com/';
    volumeLink = 'https://money.allcitygo.com/hangzhoutong/#/index';
    shopLink = 'https://money.allcitygo.com/shopping/#/goodDetail'
}

export {jsHost, apiHost, volumeLink, shopLink};

