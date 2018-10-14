import {User, Group} from 'bungie-sdk-alpha'
import MembershipDB from '../models/bungieMembership'
import ClanDB from '../models/bungieClan'

export default class MemberService {
    /**
     * @param {*} db 
     * @param {Number} id
     * @returns {Object} 
     */
    static async getMemberAndClan(db, id) {
        // Fuck you, Andrew
        const Membership   = MembershipDB(db)
        const Clan         = ClanDB(db)
        const activeRecord = await Membership.findOne({
            where:           {
                bungie_member_id : id,
                deleted          : 0
            },
            raw: true
        })

        if (!activeRecord) {
            return {}
        }

        const {bungie_clan_id} = activeRecord

        const [bungieUser, bungieClan] = await Promise.all([
            new User(id),
            new Group(bungie_clan_id)
        ])

        return {
            ...bungieUser.clean(),
            clan: bungieClan.clean()
        }
    }
}