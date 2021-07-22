import App from './App';
import * as dotenv from "dotenv";

dotenv.config();

const app = new App().application;

app.listen(3000, '0.0.0.0', async () => {
  console.log('Server listening on port 3000');
});