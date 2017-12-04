import prophecyLoader from 'prophecyjs-loader';

const script = require('./plugins/script');

let loader = new prophecyLoader();
loader.installPlugin(script);

Object.assign(prophecy, {
    loader: loader,
});

// module.exports = Color;
