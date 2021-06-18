import express from 'express';
import * as dotenv from 'dotenv';
let mysql = require('mysql');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database:process.env.DB_NAME
 });
//connection.connect();

const alleryController: express.Router = express.Router();

alleryController.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from Allergy', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})

alleryController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다.
    connection.query("INSERT INTO Allergy VALUES(" + `${req.body.id}, '${req.body.name}'` +");", function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send("값 넣었습니다.");
})



//connection.end();

export default alleryController;