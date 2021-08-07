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
        User_id:req.body.User_id, User_email:req.body.User_email, User_password:req.body.User_password, User_nickname:req.body.User_nickname
   }).then(client =>
        res.json(client)
   );    
})

// 선택한 User의 정보(닉네임)를 수정합니다. => 닉네임이나 비밀번호 등등 수정할 수 있게
UserController.patch('/:id', (req: express.Request, res: express.Response) => {
     User.update({User_nickname: req.body.User_nickname},{where: {User_id:req.params.id}})
       .then(client => {
        res.json(client)
     }); 
})

// 선택한 User의 정보(pw)를 수정합니다. => 닉네임이나 비밀번호 등등 수정할 수 있게  @현재 작동안됨
UserController.patch('/', (req: express.Request, res: express.Response) => {
    User.update({User_password: req.body.User_password},{where: {User_id:req.query.id}})
      .then(client => {
       res.json(client)
    }); 
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