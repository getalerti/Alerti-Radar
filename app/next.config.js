const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const withImages = require('next-images');

const devEnv = {
    API_URL: 'http://localhost:3009',
    FACEBOOK_APP_ID: '405811763927703',
    AUTH0_SECRET: '4h2DOVP5J8vPQgxXToDXBbUK0zb7vaB8',
    COOKIE_SECRET: '4h2DOVP5J8vPQgxXToDXBbUK0zb7vaB8',
    AUTH0_BASE_URL: 'http://localhost:3000',
    AUTH0_ISSUER_BASE_URL: 'alerti2021.eu.auth0.com',
    AUTH0_CLIENT_ID: '5jqFbzLrFls3QyNGNfkWF9FuCFyNQ3ou',
    AUTH0_CLIENT_SECRET: '6bL2Tj-krSvW5QrrBacN9c9S_hfkdEVMopWzEHFXsy76JAYyv0rccadK913F6bz0',
    GOOGLE_MYBUSINESSAPI_VERSION: 'v4',
    GOOGLE_CLIENT_ID: '118543512855-tgs4pikh9udu9fodu1i4jgo3fcj757mi.apps.googleusercontent.com'
}

module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    const isStaging =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

    const env = isDev ? devEnv : devEnv;
    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)


    return withImages({
        env,
        webpack: (config, { isServer }) => {
            // Fixes npm packages that depend on `fs` module
            if (!isServer) {
                config.node = {
                    fs: 'empty',
                    net: 'empty',
                    tls: 'empty',
                }
            }

            return config
        }
    });
}