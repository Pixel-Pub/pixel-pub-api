import ClanController from './clan'
import MemberController from './member'
import ClanMemberController from './clanMember'
import UtilController from './util'

const controllers = {
    ClanController: new ClanController(),
    MemberController: new MemberController(),
    ClanMemberController: new ClanMemberController(),
    UtilController: new UtilController
}

export default controllers