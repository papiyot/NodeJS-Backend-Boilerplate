'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {

  fastify.decorate('AuthJWT', async function (request, reply, done) {
    if (!request.raw.headers.authorization) {
      return done(new Error('Missing token header'))
    }
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' })
      return done(new Error())
    }
    done() // pass an error if the authentication fails
  })
})
