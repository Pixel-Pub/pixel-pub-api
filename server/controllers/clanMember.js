import MembershipDB from '../models/bungieMembership'

export default class ClanMemberController {

    /**
     * path: GET /clan/:clanId/member
     *
     * @param {*} ctx
     * @returns {Member}
     */
    async getAll(ctx) {
        const {id} = ctx.params
        const membership = MembershipDB(ctx.db)

        const members = await membership.findAll({
            raw   : true,
            where : {
                bungie_clan_id : id,
                deleted        : 0
            }
        })

        if (members) {
            ctx.body = members
        } else {
            ctx.throw(400, `Clan ${id} or Members for ${id} were not found`)
        }
    }
}