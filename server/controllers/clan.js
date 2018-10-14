import ClanDB from '../models/bungieClan'
import PurgeService from '../services/purge'

export default class ClanController {
    /**
     * path: GET /clan
     *
     * @param {*} ctx
     * @returns {Clan[]}
     */
    async search(ctx) {
        const Clan    = new ClanDB(ctx.db)
        const results = await Clan.findAll({raw: true})

        ctx.body = results
    }

    /**
     * path: GET /clan/:id
     *
     * @param {*} ctx
     * @returns {Clan}
     */
    async get(ctx) {
        const Clan   = new ClanDB(ctx.db)
        const {id}   = ctx.params
        const result = await Clan.findOne({where: {group_id: id}, raw: true})

        if (result) {
            ctx.body = result
        } else {
            ctx.throw(400, `Clan ${id} not found`)
        }
    }

    /**
     * path: PATCH /clan/:id
     *
     * @param {*} ctx
     * @returns {Clan}
     */
    async update(ctx) {
        const Clan   = new ClanDB(ctx.db)
        const {id}   = ctx.params
        const {body} = ctx.request
        const result = await Clan.find({id})

        try {
            Object.keys(body).forEach(key => {
                result[key] = body[key]
            })

            ctx.body = await result.save()
        } catch (e) {
            console.error(e)

            if (result) {
                ctx.throw(500, `Invalid field or update attempted`)
            } else {
                ctx.throw(400, 'Clan not found')
            }
        }
    }

    /**
     * path: PUT /clan/:id
     *
     * @param {*} ctx
     * @returns {Clan}
     */
    async replace(ctx) {
        const Clan   = new ClanDB(ctx.db)
        const {id}   = ctx.params
        const {body} = ctx.request
        const clan   = await Clan.find({id})

        try {
            ctx.body = await clan.set({...body, id})
        } catch (e) {
            console.error(e)

            if (clan) {
                ctx.throw(500, `Invalid field or update attempted`)
            } else {
                ctx.throw(400, 'Clan not found')
            }
        }
    }

    /**
     * path: DELETE /clan/:id
     *
     * @param {*} ctx 
     * @returns {null}
     */
    async delete(ctx) {
        const Clan = new ClanDB(ctx.db)

        try {
            const {id} = ctx.params
            const clan = await Clan.findOne({id})

            clan.deleted = true

            await clan.save()

            ctx.status = 200
        } catch (e) {
            console.error(e)

            ctx.throw(500, 'Unable to delete clan or clan not found')
        }
    }

    /**
     * path: POST /clan
     *
     * @param {*} ctx
     * @returns {Clan}
     */
    async create(ctx) {
        const Clan   = new ClanDB(ctx.db)
        const {body} = ctx.request
        const id     = await this.getNextId()

        try {
            ctx.body = await Clan.create({
                ...body,
                deleted: false,
                id
            })
        } catch(e) {
            console.error(e)

            ctx.throw(500, 'Unable to create clan')
        }
    }

    /**
     * path: GET /clan/:clanId?period=
     *
     * @param {*} ctx
     * @returns {Clan}
     */
    async purge(ctx) {
        const {clanId} = ctx.params
        const {period = 30} = ctx.query

        try {
            const purge = new PurgeService(ctx.db, clanId, period)

            ctx.body = await purge.run(ctx.bungie.accessToken)
        } catch (e) {
            console.error(e)

            ctx.throw(500, 'Unable to purge clan of inactives')
        }

    }

    /**
     * @private
     * @returns {Number}
     */
    async getNextId() {
        const {id} = await Clan.find().sort({id: -1}).limit(1)

        return id + 1
    }
}