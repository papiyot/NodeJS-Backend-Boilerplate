'use strict'

module.exports = async function (fastify, opts) {
  
  fastify.get('/', async function (request, reply) {
    const Users =  fastify.db.models.Users
    const Roles = fastify.db.models.Roles
  
    const GetUsers = await Users.findAll({
      include: [
        { model: Roles, required: false }
      ]
    })
    return reply.send(GetUsers);
  })
}
