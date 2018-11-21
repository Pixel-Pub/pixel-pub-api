import {Schema} from 'mongoose'
const { Types } = Schema

const ApiKeySchema = new Schema({
    CreatedAt: Types.Date,
    UserName:  Types.String,
    Key:       Types.String,
    Active:    {
        type:    Types.Boolean,
        default: true
    }
})

ApiKeySchema.pre('save', (next) => {
    const now = new Date();

    if (!this.CreatedAt) {
        this.CreatedAt = now;
    }
    next()
});

export default ApiKeySchema