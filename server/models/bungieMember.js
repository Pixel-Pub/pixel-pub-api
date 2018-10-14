import Sqlize from 'sequelize'

export const hasMembership = (member, membership) => {
    member.hasOne(membership, {
        foreignKey: 'member_id',
        as        : 'Member'
    });
}

export default function Model(database) {
    return database.define('bungie_member', 
        {
            bungie_id:      Sqlize.BIGINT,
            destiny_id:     Sqlize.BIGINT,
            last_seen:      Sqlize.DATE,
            type:           Sqlize.STRING,
            data:           Sqlize.TEXT,
            name:           Sqlize.STRING,
            deleted:        Sqlize.BOOLEAN,
            active_clan_id: Sqlize.BIGINT
        }
    )
}