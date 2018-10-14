import Sequelize from 'sequelize';

/**
 * @param {*} ctx 
 * @param {*} next 
 */
const DatabaseMiddleware = async (ctx, next) => {
    const {DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME} = process.env

    const database = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
        host    : DB_HOSTNAME,
        logging : false,
        dialect : "mysql",
        pool    : {
            max:     10,
            min:     0,
            acquire: 1000000,
            idle:    10000,
            timeout: 10000000
        },
        define : {
            paranoid:        false,
            timestamps:      true,
            freezeTableName: true,
            underscored:     true
          }
    });

    ctx.db = database

    return next()

}

export default DatabaseMiddleware