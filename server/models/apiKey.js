import mongoose from 'mongoose'
import ApiKey from '../schemas/apiKey'

export default mongoose.model("apiKeys", ApiKey)