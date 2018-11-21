import Clan from '../models/clan'
// import PurgeService from '../services/purge'

export default class ClanController {
    /**
     * path: GET /clan
     *
     * @param {*} ctx
     * @returns {Clan[]}
     */
    async search(ctx) {
        const results = await Clan.find();

        ctx.body = results
            .map((result) => result.toObject())
            .map(({Members, ...Result}) => Result)
    }

    /**
     * path: GET /clan/:id
     *
     * @param {*} ctx
     * @returns {Clan}
     */
    async get(ctx) {
        const {id}   = ctx.params
        const result = await Clan.where('GroupId').equals(id.toString()).findOne()

        if (result) {
            ctx.body = result.toObject()
        } else {
            ctx.throw(400, `Clan ${id} not found`)
        }
    }
}