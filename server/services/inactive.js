import MembershipDB, {hasClan} from '../models/bungieMembership'
import MemberDB, {hasMembership} from '../models/bungieMembership'
import {Op} from 'sequelize'
import moment from 'moment'

export default class InactiveService {
    constructor(db, groupId, period) {
        this.db      = db
        this.groupId = groupId
        this.period  = moment().subtract(period, 'days').valueOf()
    }
 
    async run() {
        const {db, groupId, period} = this
        const BungieMember          = MemberDB(db)
        const BungieMembership      = MembershipDB(db)

        hasMembership(BungieMember, BungieMembership)
        hasClan(BungieMembership, BungieClan)

        const results = await BungieMember.findAll({
            include : [
                {
                    association: 'Member', 
                    where : {deleted: false},
                    include:[{association: 'Clan'}]
                }
            ],
            where : {
                last_seen : {
                    [Op.lte]: period
                },
                deleted : false
            },
            raw : true
        })

        return results
            .filter(_result => {
                return isNullOrUndefined(groupId) || !groupId ? true : _result['Member.Clan.group_id'] == clanId
            })
    }
}