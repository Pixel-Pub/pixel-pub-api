import AuthService from '../services/auth'

/**
 * @param {*} ctx 
 * @param {*} next 
 */
const BungieMiddleware = async (ctx, next) => {
    let bungie = {}

    if (ctx.request.headers['BUNGIE-ACCESS-TOKEN'] && ctx.request.headers['BUNGIE-REFRESH-TOKEN']) {
        bungie.accessToken  = ctx.request.headers['BUNGIE-ACCESS-TOKEN']
        bungie.refreshToken = ctx.request.headers['BUNGIE-REFRESH-TOKEN']
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