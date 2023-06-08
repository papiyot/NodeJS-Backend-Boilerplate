'use strict'

module.exports = async function (fastify, opts) {

    const random = (length = 8) => {
      let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      let str = "";
      for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return str;
    };
  
  fastify.get('/', async function (request, reply) {
    const Users =  fastify.db.models.Users
      const Roles = fastify.db.models.Roles
      
      const createRole = await Roles.create({ name: `User_${random(3)}` })
      const createUser = await Users.create({userName: `User_${random(3)}@email.com`, firstName: random(5), lastName: random(4), roleId:createRole.id, password:'password'})
      
    return reply.send({data:createUser, passwordDefault:'password', message:'Create User Success'});
  })
}
