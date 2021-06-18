import { sequelize } from './models/index';
import App from './App';

const app = new App().application;

app.listen(3000, async () => {
  console.log('Server listening on port 3000');
});