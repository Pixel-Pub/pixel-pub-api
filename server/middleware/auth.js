import ApiKey from '../models/apiKey'

/**
 * @param {*} ctx 
 * @param {*} next 
 */
const AuthMiddleware = async (ctx, next) => {
    const startTimer = Date.now()

    console.log(ctx.ip, ctx.request.host, ctx.request.hostname)
    if (ctx.ip === process.env.ip || ctx.ip === process.env.pip) {
        return await next()
    }

    try {
        const key  = ctx.request.header['x-api-key']
        const user = await ApiKey.where('Key').equals(key)

        if (user === null) {
            throw new Error('Authentication failed')
        }

        ctx.response.append('AUTH-DELAY', Date.now() - startTimer)

        return await next()
    } catch(e) {
        console.log(e)
        ctx.throw(400, 'Authentication failed')
    }

}
export default AuthMiddleware