import express from 'express';
// 나중에 import로 변경바람.
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
import * as dotenv from 'dotenv';
import { doesNotMatch } from 'node:assert';
dotenv.config();

const authController: express.Router = express.Router();

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_RESTAPI_KEY,
    callbackURL: '/auth/kakao/callback'
}, async (accessToken: string, refreshToken:string, profile:any, done:any)=>{
    console.log(accessToken);
    console.log(refreshToken);
    done(null);
}));

authController.get('/kakao', passport.authenticate('kakao'));

// authController.get('/kakao/callback', passport.authenticate('kakao', {
//     failureRedirect: 'https://www.naver.com',
// }), (req, res) => {
//     console.log('나 되고 있니?');
//     res.redirect('https://www.makesand.shop');
// });

authController.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:8100?token=1234',
}), (req, res) => {
    res.redirect('https://www.makesand.shop/logins/');
});

/*
    /auth/kakao로 요청시 카카오 전략를 통해서 clientID를 담아 카카오 서버로 인증을 요청한다.
    인증 성공 시 /auth/kakao/callback으로 응답이 오게 딘다.
*/

export default authController;