import { FastifyRequest, FastifyReply } from 'fastify';
const admin = require('../config/firebase-config');

class Middleware {
  async decodeToken(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization?.split(' ')[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        console.log(decodeValue);
        return;
      }
      reply.code(401).send({ message: 'Unauthorized' });
    } catch (e) {
      reply.code(500).send({ message: 'Internal Error' });
    }
  }
}

export default new Middleware();

/*
const admin = require('../config/firebase-config');
class Middleware {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
                console.log(decodeValue);
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}
}
module.exports = new Middleware();
*/


