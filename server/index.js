import Koa from 'koa'
import dotenv from 'dotenv'
import AuthMiddleware from './middleware/auth'
import BungieMiddleware from './middleware/bungie'
import KoaRouter from 'koa-better-router'
import Routes from './routes'
import BodyParser from 'koa-bodyparser'
import mongoose from 'mongoose';

dotenv.load()

mongoose.connect(process.env.CONNECTION_STRING);
mongoose.connection.on('error', console.error);

const app    = new Koa()
const Router = KoaRouter({prefix:'/api'})

app.use(BodyParser())

Routes.forEach(({route, action, method}) => {
    Router.addRoute(method, route, action)
})

app.use(AuthMiddleware)
app.use(BungieMiddleware)

app.use(Router.middleware())

app.listen(process.env.port, () => {
    console.log(`App succesfully started on port ${process.env.port}`)
})
