import Sqlize from 'sequelize'

export default function Model(database) {
    return database.define('api_key',
        {
            key:      Sqlize.STRING,
            username: Sqlize.STRING
        }
    )
}