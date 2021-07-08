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

const MenuController: express.Router = express.Router();
//User에 있는 모든 정보를 가져옵니다.
MenuController.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from Menu', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})
//Menu중 선택한 Menu_id의 정보를 가져옵니다.
MenuController.get('/:id', (req: express.Request, res: express.Response) => {
    connection.query("SELECT * FROM Menu WHERE Menu_category = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})
//Menu에 데이터를 추가합니다.
MenuController.post('/', (req: express.Request, res: express.Response) => {
    connection.query(`INSERT INTO Menu VALUES ( ${req.body.id}, '${req.body.name}', '${req.body.calorie}','${req.body.price}','${req.body.imageUrl},'${req.body.describe}'');`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.id}을 넣었습니다.`);
})

// 
MenuController.put('/', (req: express.Request, res: express.Response) => {
    connection.query(`UPDATE Menu SET Menu_price = '${req.body.price}' WHERE Menu_id = '${req.body.id}';`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.name}의 정보를 수정하였습니다.`);
})

MenuController.delete('/:id', (req: express.Request, res: express.Response) => {
    connection.query(`DELETE FROM Menu WHERE Menu_id =${req.params.id};` , function (error:String, rows:String, fields:String){
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default MenuController;