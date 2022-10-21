const path = require('path')

require('dotenv').config()

module.exports = {

  env: {
    API_URL: process.env.API_URL,
    CRIPT_STRING: process.env.CRIPT_STRING,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    CRIPT_STRING: process.env.CRIPT_STRING,
    IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
  },

 
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['public'] = path.join(__dirname, 'public')

    return config
  }
}
