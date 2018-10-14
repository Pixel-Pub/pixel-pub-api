import AuthService from '../services/auth'

/**
 * @param {*} ctx 
 * @param {*} next 
 */
const BungieMiddleware = async (ctx, next) => {
    let bungie = {}

    if (ctx.request.headers['bungieAccessToken'] && ctx.request.headers['bungieRefreshToken']) {
        bungie.accessToken  = ctx.request.headers['bungieAccessToken']
        bungie.refreshToken = ctx.request.headers['bungieRefreshToken']
    }

    if (bungie.refreshToken) {
        try {
            bungie = await AuthService.refreshToken(bungie.refreshToken)
        } catch(e) {
            bungie = {}
        }
    }

    ctx.bungie = bungie

    return next()
}

export default BungieMiddleware