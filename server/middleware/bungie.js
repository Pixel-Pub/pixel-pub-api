import AuthService from '../services/auth'

/**
 * @param {*} ctx 
 * @param {*} next 
 */
const BungieMiddleware = async (ctx, next) => {
    let bungie = {}

    if (ctx.request.headers['bungie-access-token'] && ctx.request.headers['bungie-refresh-token']) {
        bungie.accessToken  = ctx.request.headers['bungie-access-token']
        bungie.refreshToken = ctx.request.headers['bungie-refresh-token']
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