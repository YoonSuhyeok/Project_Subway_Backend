import express from 'express';
import { Ingredient } from '../models/Ingredient';

const ingredientController: express.Router = express.Router();
//모든 재료의 정보를 가져옵니다. 
ingredientController.get('/', (req: express.Request, res: express.Response) => {
    Ingredient.findAll().then( client =>
        res.json(client)
    );
})
//선택한 id의 재료정보를 가져옵니다.
ingredientController.get('/:id', (req: express.Request, res: express.Response) => {
    Ingredient.findOne({
        where: {Ingredient_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})

export default ingredientController;