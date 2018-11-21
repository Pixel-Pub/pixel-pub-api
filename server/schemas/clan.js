import {Schema} from 'mongoose'
const { Types } = Schema

const MemberSchema = new Schema({
    BungieId:       Types.String,
    DestinyId:      Types.String,
    MembershipType: Types.String,
    LastSeen:       Types.Mixed,
    Name:           Types.String,
    Data:           Types.Mixed
})

const ClanSchema = new Schema({
    CreatedAt:   Types.Date,
    GroupId:     Types.Number,
    LastSynced:  Types.Date,
    Inactive:    Types.Boolean,
    Platform:    Types.String,
    Name:        Types.String,
    Members:     [MemberSchema],
    Region:      Types.String,
    MemberCount: Types.Number,
})

ClanSchema.pre('save', (next) => {
    const now = new Date();
    if (!this.CreatedAt) {
        this.CreatedAt = now;
    }
    next()
});

export default ClanSchema