import express from 'express';
import alleryController from './routes/allergyController';
import breadController from './routes/breadController';
import ingredientController from './routes/ingredientController';
import recipeCntroller from './routes/recipeCntroller';
import UserController from './routes/UserController';
import MenuController from './routes/MenuController';
import authController from './routes/auth';
const passport = require('passport');

const session = require('express-session')

declare module 'express-session' {
  export interface SessionData {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }
}
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
    this.router();
    sequelize.sync().then( client =>
      console.log(client)
    );
  }

  private router(): void {
    // this.application.get('/', (req: express.Request, res: express.Response) => {
    //   let session = req.session;
    //   session.user = '123';
    //   return res.json(session);
    // });
    this.application.use('/allergy', alleryController);
    this.application.use('/bread', breadController);
    this.application.use('/combination', recipeCntroller);
    this.application.use('/ingredient', ingredientController);
    this.application.use('/user', UserController);
    this.application.use('/user', MenuController);
    this.application.use('/auth', authController);
  }
}

export default App;
