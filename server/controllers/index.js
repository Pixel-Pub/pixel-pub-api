import ClanController from './clan'
import ClanMemberController from './clanMember'
import UtilController from './util'

const controllers = {
    ClanController: new ClanController(),
    ClanMemberController: new ClanMemberController(),
    UtilController: new UtilController
}

export default controllers