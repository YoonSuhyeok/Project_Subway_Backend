import breadController from './routes/breadController';
import ingredientController from './routes/ingredientController';
import recipeController from './routes/recipeController';
import UserController from './routes/UserController';
import MenuController from './routes/MenuController';
import express from 'express';
import extraController from './routes/extraController';
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
<<<<<<< HEAD
  }

  private router(): void {
    this.application.get('/', (req: express.Request, res: express.Response) => {
      res.send('hello!');
    })
=======
    sequelize.sync();
  }

  private router(): void {
    // this.application.get('/', (req: express.Request, res: express.Response) => {
    //   let session = req.session;
    //   session.user = '123';
    //   return res.json(session);
    // });
    this.application.use('/allergy', alleryController);
>>>>>>> develop_kakao
    this.application.use('/bread', breadController);
    this.application.use('/extra', extraController);
    this.application.use('/recipe', recipeController);
    this.application.use('/ingredient', ingredientController);
<<<<<<< HEAD
    this.application.use('/user',UserController);
    //this.application.use('/menu',MenuController);
=======
    this.application.use('/user', UserController);
    this.application.use('/menu', MenuController);
    this.application.use('/auth', authController);
>>>>>>> develop_kakao
  }
}

export default App;
