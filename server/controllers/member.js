import MemberService from '../services/member'

export default class MemberController {
    /**
     * path: GET /member/:id
     *
     * @param {*} ctx
     * @returns {Member}
     */
    async get(ctx) {
        const data = await MemberService.getMemberAndClan(ctx.db, ctx.params.id)

        if (data) {
            ctx.body = data
        } else {
            ctx.throw(400, `Member ${id} not found`)
        }
    }
}