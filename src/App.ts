import express from 'express';
import alleryController from './routes/allergyController';
import UserController from './routes/UserController';
import MenuController from './routes/MenuController';
class App {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended : true }));
    this.router();
  }

  private router(): void {
    this.application.get('/', (req: express.Request, res: express.Response) => {
      res.send('hello!');
    })
    this.application.use('/allergy', alleryController);
    this.application.use('/user',UserController);
    this.application.use('/user',MenuController);
  }
}

export default App;
