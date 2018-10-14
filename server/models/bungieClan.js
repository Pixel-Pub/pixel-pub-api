import Sqlize from 'sequelize'

export const hasClan = (mermbership, clan) => {
    mermbership.belongsTo(clan, {
        foreignKey: 'clan_id',
        as        : 'Clan'
    });
}

export default function Model(database) {
    return database.define('bungie_clan',
        {
            data:         Sqlize.TEXT,
            deleted:      Sqlize.BOOLEAN,
            group_id:     Sqlize.INTEGER,
            synced_at:    Sqlize.DATE,
            name:         Sqlize.STRING,
            member_count: Sqlize.INTEGER,
            platform:     Sqlize.STRING,
            latest:       Sqlize.BOOLEAN
        }
    )
}