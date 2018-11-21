export default class UtilController {
    /**
     * path: GET /util/validateAuth
     *
     * @param {*} ctx
     * @returns {}
     */
    async validateAuth(ctx) {
        ctx.body = {result: Object.keys(ctx.bungie).length > 0}
    }
}