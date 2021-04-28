import { sequelize } from './models/index';
import App from './App';
import dotenv from 'dotenv';



const app = new App().application;

app.listen(3000, async () => {
  console.log('Server listening on port 3000');

  await sequelize.authenticate()
  .then(async () =>{
    console.log("connection success");
  } )
  .catch( (e) => {
    console.log('TT : ', e);
  })
});