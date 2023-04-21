const { override } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const { theme } = require('antd/lib');
const { convertLegacyToken } = require('@ant-design/compatible/lib');

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);

module.exports = override(
  addLessLoader({
    cssLoaderOptions: {
      sourceMap: true,
      modules: {
        localIdentName: '[hash:base64:8]',
      },
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      lessOptions: {
        strictMath: true,
        modifyVars: v4Token,
      },
    },
  }),
);
