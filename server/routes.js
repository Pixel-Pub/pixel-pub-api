import Controllers from './controllers'

const routes = [
    {
        route:  'clan/',
        method: 'GET',
        action: Controllers.ClanController.search
    },
    {
        route:  'clan/:id',
        method: 'GET',
        action: Controllers.ClanController.get
    },
    {
        route: 'clan/:id',
        method: 'DELETE',
        action: Controllers.ClanController.delete
    },
    {
        route: 'clan/:id',
        method: 'PUT',
        action: Controllers.ClanController.replace
    },
    {
        route:  'clan/:id',
        method: 'PATCH',
        action: Controllers.ClanController.update
    },
    {
        route:  'clan/',
        method: 'POST',
        action: Controllers.ClanController.create
    },
    {
        route:  'clan/:id/purge',
        method: 'GET',
        action: Controllers.ClanController.create
    },
    {
        route:  'member/:id',
        method: 'GET',
        action: Controllers.MemberController.get
    },
    {
        route: 'clan/:id/member',
        method: 'GET',
        action: Controllers.ClanMemberController.getAll
    },
    {
        route:  '/util/validateAuth',
        method: 'GET',
        action: Controllers.UtilController.validateAuth
    }
]

export default routes