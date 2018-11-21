import Clan from '../models/clan';

export default class ClanMemberController {
    /**
     * path: GET /clan/:clanId/member
     *
     * @param {*} ctx
     * @returns {Member}
     */
    async getAll(ctx) {
        const {id} = ctx.params
        const clan = await Clan.where('GroupId').equals(id.toString()).findOne()

        if (clan) {
            ctx.body   = clan.get('Members')
            ctx.status = 200
        } else {
            ctx.body   = 'No clan Found'
            ctx.status = 404
        }
    }

    /**
     * path: POST /
     */
    async kick(ctx) {
        const {id, type} = ctx.params
    }
}