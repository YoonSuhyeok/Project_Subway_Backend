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

const UserController: express.Router = express.Router();
//User에 있는 모든 정보를 가져옵니다.
UserController.get('/', (req: express.Request, res: express.Response) => {
    connection.query('SELECT * from User', function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})
//User중 선택한 User_id의 정보를 가져옵니다.
UserController.get('/:id', (req: express.Request, res: express.Response) => {
    connection.query("SELECT * FROM User WHERE User_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
        res.json(rows);
    });
})
//User에 데이터를 추가합니다.
UserController.post('/', (req: express.Request, res: express.Response) => {
    connection.query(`INSERT INTO User VALUES ( ${req.body.id}, '${req.body.email}', '${req.body.password}','${req.body.nickname}');`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.id}을 넣었습니다.`);
})

// 
UserController.put('/', (req: express.Request, res: express.Response) => {
    connection.query(`UPDATE User SET User_password = '${req.body.password}', User_nickname = '${req.body.nickname}' WHERE User_email = '${req.body.email}';`, function (error:String, rows:String, fields:String) {
        if (error) throw error;
    });
    res.send(`${req.body.nickname}의 정보를 수정하였습니다.`);
})

UserController.delete('/:id', (req: express.Request, res: express.Response) => {
    connection.query(`DELETE FROM User WHERE User_id =${req.params.id};` , function (error:String, rows:String, fields:String){
        if (error) throw error;
    });
    res.send(`${req.params.id}를 삭제했습니다!`);
})
//connection.end();

export default UserController;
