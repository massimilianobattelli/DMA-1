import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import httpStatus from 'http-status';
import { Repository } from '../repository/repository'

interface QueryString {
  limit: number;
}

export class Router {
  private repository: Repository

  constructor(server: FastifyInstance) {
    this.repository = new Repository()
    this.setupRoutes(server)
  }

  private setupRoutes(server: FastifyInstance) {
    server.addHook('onRequest', (req, res, done) => {
      res.header('Access-Control-Allow-Origin', '*'); 
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.status(200);
        res.send();
        return;
      }
      done();
    });

    server.route({
      method: 'POST',
      url: '/add-user',
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string'}
          },
          required: [
            'name'
          ]
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: { type: 'object' }
            }
          }
        }
      },
      handler: async (request, reply) => {
        const newData = request.body;
        const insertedUser = await this.repository.insertUser(newData);
        console.log('Utente inserito con successo:', insertedUser);
        return { message: 'Dati salvati correttamente', user: insertedUser };
      }
    });
    
    server.route({
      method: 'GET',
      url: '/',
      schema: {
        querystring: {
          limit: { type: 'integer',  minimum: 1, maximum: 10 }, // Aggiungi qui il parametro limit
        },
        response: {
          200: {
            type: 'array',
            properties: {
              id: {type: 'number'},
              name: { type: 'string' }
            }
          }
        }
      },
      handler: async (request: FastifyRequest<{ Querystring: QueryString }>, reply) => {
        const { limit } = request.query;
        console.log("limit: " + limit)
        const users = await this.repository.getUsers(limit);
        return users;
      }
    });

  }
}


