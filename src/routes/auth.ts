import express from 'express';
// 나중에 import로 변경바람.
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
import * as dotenv from 'dotenv';
dotenv.config();

const authController: express.Router = express.Router();

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_RESTAPI_KEY,
    callbackURL: '/auth/kakao/callback'
}, async (accessToken: string, refreshToken:string, profile:any, done: any)=>{
    console.log(accessToken);
    done(null);
}));

authController.get('/kakao', passport.authenticate('kakao'));

authController.get('kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'https://makesand.shop',
}), (req, res) => {
    res.redirect('https://makesand.shop');
});

/*
    /auth/kakao로 요청시 카카오 전략를 통해서 clientID를 담아 카카오 서버로 인증을 요청한다.
    인증 성공 시 /auth/kakao/callback으로 응답이 오게 딘다.
*/

export default authController;