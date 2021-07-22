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
//새로운 재료정보를 입력합니다.
ingredientController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다.
    Ingredient.create({
        Ingredient_id:req.body.id,Ingredient_type:req.body.type, Ingredient_name:req.body.name, Ingredient_calorie:req.body.calorie,Ingredient_price:req.body.price, Ingredient_imageUrl:req.body.url
   }).then(client =>
        res.json(client)
   ); 
})
//선택한 재료의 정보(이름)를 수정합니다.
ingredientController.patch('/:id', (req: express.Request, res: express.Response) => {
    // Ingredient.update({Ingredient_name: 'ingredient'},{where: {Ingredient_ID:req.params.id}})
    // .then(client => {
    //     res.json(client)
    // }); 
})
//선택한 재료의 정보를 삭제합니다.
ingredientController.delete('/:id', (req: express.Request, res: express.Response) => {
    Ingredient.destroy({
        where: {Ingredient_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default ingredientController;