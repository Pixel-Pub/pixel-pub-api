import mongoose from 'mongoose'
import Clan from '../schemas/clan'

export default mongoose.model("clans", Clan)