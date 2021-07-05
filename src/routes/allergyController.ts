import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import { Allergy } from '../models/Allergy';


const alleryController: express.Router = express.Router();

alleryController.get('/', (req: express.Request, res: express.Response) => {
    Allergy.findAll();
})

// alleryController.get('/:id', (req: express.Request, res: express.Response) => {
//     connection.query(`SELECT * FROM Allergy WHERE Allergy_id = ${req.params.id};`, function (error:String, rows:String, fields:String) {
//         if (error) throw error;
//         res.json(rows);
//     });
// })

// alleryController.post('/', (req: express.Request, res: express.Response) => {
//     // DB에 auto_increment로 했음 좋겠습니다.
//     connection.query("INSERT INTO Allergy VALUES(" + `${req.body.id}, '${req.body.name}'` +");", function (error:String, rows:String, fields:String) {
//         if (error) throw error;
//     });
//     res.send(`${req.body.name}을 넣었습니다.`);
// })

// alleryController.put('/', (req: express.Request, res: express.Response) => {
//     connection.query("UPDATE Allergy SET Allergy_name ="+ `${req.body.name}` + "WHERE Allergy_id = " + `${req.body.id}` + ";", function (error:String, rows:String, fields:String) {
//         if (error) throw error;
//     });
//     res.send(`${req.body.id}번째를 수정하였습니다.`);
// })

// alleryController.delete('/:id', (req: express.Request, res: express.Response) => {
//     connection.query("DELETE FROM Allergy WHERE Allergy_id = " + `${req.params.id};`, function (error:String, rows:String, fields:String) {
//         if (error) throw error;
//     });
//     res.send(`${req.params.id}를 삭제했습니다!`);
// })
//connection.end();

export default alleryController;