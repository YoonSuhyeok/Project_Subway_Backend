import express from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

const UserController: express.Router = express.Router();

//User중 선택한 User_id의 정보를 가져옵니다.
UserController.post('/login', async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
        where: {User_email : req.body.email, User_password: req.body.password}
    })
    
    const loginState = await bcrypt.compare(user!.User_password, req.body.password)

    if(loginState){ res.status(404).send('fail'); }
    res.send('success')
})

//User에 데이터를 추가합니다.
UserController.post('/', async (req: express.Request, res: express.Response) => {
    User.create({
        User_email: req.body.email,
         User_password: await bcrypt.hash(req.body.password, 10),
          User_nickname:req.body.nickname
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