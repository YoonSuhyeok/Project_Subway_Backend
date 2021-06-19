import express from 'express';
import alleryController from './routes/allergyController';
import breadController from './routes/breadController';
import ingredientController from './routes/ingredientController';
import recipeCntroller from './routes/recipeCntroller';
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
    this.application.use('/bread', breadController);
    this.application.use('/combination', recipeCntroller);
    this.application.use('/ingredient', ingredientController);
  }
}

export default App;