import { FastifyInstance } from 'fastify'
import { Repository } from '../repository/repository'

export class Controller {
  private repository: Repository

  constructor(fastify: FastifyInstance) {
    this.repository = new Repository()
    this.setupRoutes(fastify)
  }

  private setupRoutes(fastify: FastifyInstance) {
    
    fastify.addHook('onRequest', (req, res, done) => {
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

    fastify.get('/', async (req, res) => {
      const users = await this.repository.getUsers()
      console.log(users)
      const data = { message: 'Dati dal backend!!!' };
      return users;
    });
    
    fastify.post('/add-user', async (req, res) => {
      const newData = req.body;
      const insertedUser = await this.repository.insertUser(newData);
      console.log('Utente inserito con successo:', insertedUser);
      return { message: 'Dati salvati correttamente', user: insertedUser };
    });
  }
}
