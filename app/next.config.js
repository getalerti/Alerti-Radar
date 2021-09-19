import env from "./env";

const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const withImages = require('next-images');

const devEnv = env

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