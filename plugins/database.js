const sequelizeFastify = require('sequelize-fastify')
const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify.register(
        sequelizeFastify,
        {
          instance: 'db',
          sequelizeOptions: {
            dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
            database: fastify.config.NODE_DB_NAME,
            username: fastify.config.NODE_DB_USERNAME,
            password: fastify.config.NODE_DB_PASSWORD,
            options: {
              host: fastify.config.NODE_DB_HOST,
              port: fastify.config.NODE_DB_PORT
            }
          }
        }
      )
        .ready(async () => {
          try {
            const result = await fastify.db.authenticate()
            console.log('Database connection is successfully established.')
          } catch (err) {
            console.log(`Connection could not established: ${err}`)
          } finally {
            // fastify.close()
          }
        })
})
  
