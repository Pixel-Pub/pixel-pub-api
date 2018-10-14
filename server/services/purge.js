import InactiveService from './inactive'
import {Group} from 'bungie-sdk-alpha'

export default class PurgeService {
    constructor(db, groupId, period) {
        this.db       = db
        this.groupId  = groupId
        this.period   = moment().subtract(period, 'days').valueOf()
        this.inactive = new InactiveService(db, groupId, period)
    }

    async run(accessToken) {
        const {groupId, inactive} = this

        const inactiveMembers = await inactive.run()
        const group           = await new Group(groupId, accessToken)
        
        inactiveMembers.forEach(async ({bungie_id, Member}) => {
            console.log('Kicking,', bungie_id, Member)
            return await Promise.resolve('GONNA KICK A NUB')
            //await group.kickMember(Member.membership_type, bungie_id)
        })
        
        return inactiveMembers
    }
}