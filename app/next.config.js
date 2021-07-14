const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const withImages = require('next-images');

module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    const isStaging =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

    const env = {
        RESTURL_SPEAKERS: (() => {
            if (isDev) return 'http://localhost:3009'
            if (isProd) {
                return 'http://localhost:3009'
            }
            if (isStaging) return 'http://localhost:3009'
            return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
        })(),
        RESTURL_SESSIONS: (() => {
            if (isDev) return 'http://localhost:3009'
            if (isProd) return 'http://localhost:3009'
            if (isStaging) return 'http://localhost:3009'
            return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
        })(),
    }

    return withImages({
        env,
    });
}