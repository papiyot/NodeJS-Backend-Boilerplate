'use strict'

module.exports = async function (fastify, _opts) {
  const schema = {
    body: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' }
      },
      required: ['username','password']
    }
  }
  fastify.post(
    "/",
    { schema },
    async (req, reply) => {
      const Users = fastify.db.models.Users;
      const Roles = fastify.db.models.Roles;
      const GetUsers = await Users.findOne({
        where: {
          userName: req.body.username,
        },
        include: [{ model: Roles, required: false }],
      });
      if (GetUsers?.userName) {
        const compare = await fastify.bcrypt.compare(
          req.body.password,
          GetUsers?.password
        );
        if (compare) {
          const User = {
            id: GetUsers.id,
            userName: GetUsers.userName,
            firstName: GetUsers.firstName,
            lastName: GetUsers.lastName,
            roleId: GetUsers.roleId,
            roleName: GetUsers?.Role?.roleName,
          };
          const token = fastify.jwt.sign(User);
          return reply.send({...User, token});
        } else {
          reply.statusCode = 500;
          return reply.send({ message: "Password Not match" });
        }
      } else {
        reply.statusCode = 500;
        return reply.send({ message: "User Not Found" });
      }
    }
  );
}
