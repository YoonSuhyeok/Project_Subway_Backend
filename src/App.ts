import breadController from './routes/breadController';
import ingredientController from './routes/ingredientController';
import recipeController from './routes/recipeController';
import UserController from './routes/UserController';
import MenuController from './routes/MenuController';
import express from 'express';
import extraController from './routes/extraController';
import authController from './routes/auth';
import RatingController from './routes/ratingController';
const passport = require('passport');
const cors = require('cors');
const session = require('express-session')

declare module 'express-session' {
  export interface SessionData {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }
}
var sequelize = require('./models').sequelize;
sequelize.sync();
class App {
  public application: express.Application;
  public sess: any;

  constructor() {
    this.application = express();
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended : true }));
    this.application.use(session({
      secret: '21314',
      resave: false,
      saveUninitialized: true,
    }));
    this.application.use(passport.initialize());
    this.application.use(passport.session());
    this.application.use(cors());
    this.router();
  }

  private router(): void {
    this.application.get('/', (req: express.Request, res: express.Response) => {
      res.send('hello!');
    })
    this.application.use('/bread', breadController);
    this.application.use('/extra', extraController);
    this.application.use('/recipe', recipeController);
    this.application.use('/ingredient', ingredientController);
    this.application.use('/user', UserController);
    this.application.use('/menu', MenuController);
    this.application.use('/auth', authController);
    this.application.use('/rating', RatingController);
  }
}

export default App;
