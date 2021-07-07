import express from 'express';
import alleryController from './routes/allergyController';
import breadController from './routes/breadController';
import ingredientController from './routes/ingredientController';
import recipeCntroller from './routes/recipeCntroller';
import UserController from './routes/UserController';
import MenuController from './routes/MenuController';
import { sequelize } from './models/index';

class App {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended : true }));
    this.router();
    sequelize.sync().then( client =>
      console.log(client)
    );
  }

  private router(): void {
    this.application.get('/', (req: express.Request, res: express.Response) => {
      res.send('hello!');
    })
    this.application.use('/allergy', alleryController);
    this.application.use('/bread', breadController);
    this.application.use('/combination', recipeCntroller);
    this.application.use('/ingredient', ingredientController);
    this.application.use('/user',UserController);
    this.application.use('/user',MenuController);
  }
}

export default App;
