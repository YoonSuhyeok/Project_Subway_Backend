const { DataTypes } =require('sequelize');
import { sequelize } from '../models/index';
import express from 'express';
import { User } from '../models/User';

const UserController: express.Router = express.Router();
//User에 있는 모든 정보를 가져옵니다.
UserController.get('/', (req: express.Request, res: express.Response) => {  
  User.findAll().then( client =>
        res.json(client)
    );
})
//User중 선택한 User_id의 정보를 가져옵니다.
UserController.get('/:id', (req: express.Request, res: express.Response) => {
    User.findOne({
        where: {User_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})
//User에 데이터를 추가합니다.
UserController.post('/', (req: express.Request, res: express.Response) => {
    User.create({
      User_nickname:req.body.nickname
   }).then(client =>
        res.json(client)
   );    
})

// 선택한 User의 정보(비밀번호)를 수정합니다. 
UserController.patch('/:id', (req: express.Request, res: express.Response) => {
    // User.update({User_password: req.body.password},{where: {User_ID:req.params.id}})
    // .then(client => {
    //     res.json(client)
    // }); 
})
//선택한 User의 정보를 삭제합니다.
UserController.delete('/:id', (req: express.Request, res: express.Response) => {
    User.destroy({
        where: {User_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default UserController;
