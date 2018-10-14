import ClanController from './clan'
import MemberController from './member'
import ClanMemberController from './clanMember'

const controllers = {
    ClanController: new ClanController(),
    MemberController: new MemberController(),
    ClanMemberController: new ClanMemberController()
}

export default controllers