import ApiKeyDB from '../models/apiKey'
import atob from 'atob'
/**
 * @param {*} ctx 
 * @param {*} next 
 */
const AuthMiddleware = async (ctx, next) => {
    const startTimer = Date.now()

    if (ctx.ip === process.env.ip || ctx.ip === process.env.pip) {
        return await next()
    }

    const ApiKey = new ApiKeyDB(ctx.db)

    try {
        const key    = ctx.request.header['x-api-key']
        const user   = await ApiKey.findOne({
            where: {key}
        })

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