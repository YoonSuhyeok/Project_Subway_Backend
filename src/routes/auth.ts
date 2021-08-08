import express from 'express';
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
import * as dotenv from 'dotenv';
dotenv.config();
const { DataTypes } =require('sequelize');
import { sequelize } from '../models/index';
import axios from 'axios';

const User = sequelize.define('User', {
    // Model attributes are defined here
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      User_email: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      User_password: {
        type: DataTypes.STRING(18),
        allowNull: true
      },
      User_nickname: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      access_token: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      refresh_token: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      tableName: 'User',
      timestamps: false,
      
  });

const authController: express.Router = express.Router();

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_RESTAPI_KEY,
    callbackURL: '/auth/kakao/callback'
}, async (accessToken: string, refreshToken:string, profile:any, done: any)=>{
    
    const user = await User.findOne( {where: {User_nickname : profile.id} })
    if(!user){
        User.create({
            User_nickname: profile.id,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } else {
        User.update(
        {access_token: accessToken, refresh_token: refreshToken},
        { where : { User_nickname: profile.id } });
    }
    done(null, profile);
}));

passport.serializeUser( (user:any, done:any) => {
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser((id:any, done:any) => {
    console.log(id);
    done(null, id);
});



authController.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'http://naver.com',
}), (req, res) => {
  console.log("hi");
  console.log(req);
});

authController.get('/session', (req: express.Request, res: express.Response) => {
    console.log("hi" + req.session);
    return res.send(req.session.userId);
})

const kakaoHeader = {
  'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
};



authController.post('/kakao', async (req: express.Request, res) => {  
  const code: string | undefined = req.headers.authorization?.substr(6);
  try{
    const redirectUrl = process.env.redirectUrl;
    const result = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=12a7a0cf669e322de8404d4da83ca650&redirect_uri=${redirectUrl}/logins.kakao&code=${code}`)
    res.send(result.data);
  } catch(e) {
    console.log(e);
  }
  
  
  // return res.send(result.data);
});

authController.get('/kakao/verification', async (req: express.Request, res) => {

})
/*
    /auth/kakao로 요청시 카카오 전략를 통해서 clientID를 담아 카카오 서버로 인증을 요청한다.
    인증 성공 시 /auth/kakao/callback으로 응답이 오게 딘다.
*/

export default authController;