import express from 'express';
import { ClientRequest } from 'node:http';
import { getAttributes } from 'sequelize-typescript';
import { Choice_Ingredient}from '../models/Choice_Ingredient';
import { Extra } from '../models/Extra';
import Ingredient from '../models/Ingredient';
import { Recipe }from '../models/Recipe';
Choice_Ingredient.belongsTo(Recipe)
Recipe.hasMany(Choice_Ingredient)
const choice_ingredientController: express.Router = express.Router();
//choice_ingredient에 있는 모든 정보를 가져옵니다.

choice_ingredientController.get('/', (req: express.Request, res: express.Response) => {
    Choice_Ingredient.findAll().then( client =>
        res.json(client)
    );
})

//choice_ingredient 중 선택한 recipe_id의 정보를 가져옵니다.
choice_ingredientController.get('/:id', (req: express.Request, res: express.Response) => {
    Choice_Ingredient.findOne({
        where: {"Recipe.id" : req.params.id}
    }).then( client =>
        res.json(client)
    );
})

export default choice_ingredientController;