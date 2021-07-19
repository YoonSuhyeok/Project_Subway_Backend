import breadController from './routes/breadController';
import ingredientController from './routes/ingredientController';
import recipeController from './routes/recipeController';
import UserController from './routes/UserController';
import MenuController from './routes/MenuController';
import express from 'express';

var sequelize = require('./models').sequelize;
sequelize.sync();
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
    this.application.use('/bread', breadController);
    this.application.use('/recipe', recipeController);
    this.application.use('/ingredient', ingredientController);
    this.application.use('/user',UserController);
    this.application.use('/menu',MenuController);
  }
}

export default App;
