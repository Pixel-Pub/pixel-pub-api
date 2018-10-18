import SelectMembersFromClan from '../queries/selectMembersFromClan'

export default class ClanMemberController {

    /**
     * path: GET /clan/:clanId/member
     *
     * @param {*} ctx
     * @returns {Member}
     */
    async getAll(ctx) {
        const {id} = ctx.params

        const replacements = {
            clanId: id
        }

        const type = ctx.db.QueryTypes.SELECT

        const results = await ctx.db.query(SelectMembersFromClan, {replacements, type})

        ctx.body = results
        ctx.status = 200
    }
}