import express from 'express';
import { Rating } from './../models/Rating(Comment)';
import { Recipe } from '../models/Recipe';
import { User } from '../models/User';
import * as moment from 'moment-timezone';
const dateSeoul: Date = moment.tz(Date.now(), "Asia/Seoul").add(9, 'hour').toDate();

const RatingController: express.Router = express.Router();

RatingController.post('/', async (req: express.Request, res: express.Response) => {
    try {
        
        const userId = await User.findOne({
            where: {User_nickname : req.query.user_nickname}
        });

        const recipe_id: number| undefined = +(req.query.recipe_id as string);
        const dateSeoul: Date = moment.tz(Date.now(), "Asia/Seoul").add(9, 'hour').toDate();
        if(recipe_id){ 
            Rating.create({
                User_id: userId?.User_id,
                Recipe_id: recipe_id,
                Rating_score: +req.body.score,
                Rating_dateCreated: dateSeoul.toString()
            });
        }
        
        res.send('success');
    } catch(e){
        
    }
});

RatingController.get('/:recipe_id', (req: express.Request, res: express.Response) => {
    
    Rating.findOne({
        where: {Recipe_id: req.params.recipe_id}
    }).then( rating =>
        res.send(rating)
    )
})

RatingController.patch('/', async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findOne({
            where: {User_nickname : req.query.user_nickname}
        });
        if(!user){
            res.status(404).send('Not Found User');
        }
        const recipe_user = await User.findOne({
            where: {User_nickname : req.query.recipe_user_name}
        });
        if(!recipe_user){
            res.status(404).send('Not Found recipe User');
        }
        const recipe = await Recipe.findOne({
            where: { User_id: recipe_user?.User_id, Recipe_name: req.query.recipe_name }
        })
        if(!recipe){
            res.status(404).send('Not Found recipe');
        }
        if(recipe){
            Rating.update({Rating_score: req.body.score, Rating_dateCreated: dateSeoul.toString()},
             { where: { Recipe_id: recipe?.Recipe_id, User_id: user?.User_id}
            })
        }
        
        res.send('success');
    } catch(e){
        
    }
});

RatingController.delete('/', async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
        where: {User_nickname : req.query.user_nickname}
    });
    if(!user){
        res.status(404).send('Not Found User');
    }
    const recipe_user = await User.findOne({
        where: {User_nickname : req.query.recipe_user_name}
    });
    if(!recipe_user){
        res.status(404).send('Not Found recipe User');
    }
    const recipe = await Recipe.findOne({
        where: { User_id: recipe_user?.User_id, Recipe_name: req.query.recipe_name }
    })
    if(!recipe){
        res.status(404).send('Not Found recipe');
    }
    if(recipe){
        Rating.destroy({
            where: { User_id: user?.User_id, Recipe_id: recipe?.Recipe_id }
        });
    }
    res.send('success');
});

export default RatingController;
