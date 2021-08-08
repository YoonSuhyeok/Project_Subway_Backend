import express from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import Mail from '../models/Mail';
import nodemailer from 'nodemailer';
import * as moment from 'moment-timezone';
const dateSeoul: Date = moment.tz(Date.now(), "Asia/Seoul").add(9, 'hour').toDate();
import * as dotenv from 'dotenv';
dotenv.config();

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

UserController.get('/key', async (req: express.Request, res: express.Response) => {
    let key = '';
    for(let i=0; i<6; ++i)
        key+=Math.floor(Math.random()*9)+1
    console.log(key);
    const user_email = req.query!.userId;
    const userId = await User.findOne({where: { User_email: user_email }});

    Mail.create({key: key, User_id: userId!.User_id, Mail_dateCreated: dateSeoul.toString()});
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
    });

    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: user_email!.toString(),
        subject: '섭웨이 이메일 인증',
        text: `인증번호: ${key}\n 5분 안에 입력하세요`
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){ console.log(error )}
        else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send('인증번호 발송');
})

UserController.get('/certify', async (req: express.Request, res: express.Response) => {
    
    const user_email = req.query!.userId;
    const userId = await User.findOne({where: { User_email: user_email }});

    const check = await Mail.findOne({
        where: { User_id: userId?.User_id, key: req.query.key }
    })
    const mailDate = Date.parse(check!.Mail_dateCreated);
    const seoul = Date.parse(moment.tz(Date.now(), "Asia/Seoul").add(9, 'hour').toDate().toString());
    const diff = seoul - mailDate;
    const minute = Math.floor(diff/60/1000)

    if(minute >= 5) res.status(400).send('시간 초과');
    else if(!check) res.status(404).send('올바르지 않은 인증번호입니다.');
    else res.send('true');
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