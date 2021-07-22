
import express from 'express';
import Recipe from '../models/Recipe';


const recipeController: express.Router = express.Router();

// 모든 유저의 조합식을 본다.
recipeController.get('/', (res: express.Response) => {
  Recipe.findAll().then( recipe => res.json(recipe) );
});

// userID로 그 유저의 모든 레시피정보를 가져온다.
recipeController.get('/:id', (req: express.Request, res: express.Response) => {
  Recipe.findAll({ where: {User_id : req.params.id }}).then( recipe =>
    res.send(recipe) );
});

// 한 유저가 하나의 레시피 조회한다. /userId?name=에그마요   연구연구
recipeController.get('/:id', (req: express.Request, res: express.Response) => {
  Recipe.findOne({ where: {User_id : req.params.id, Recipe_name: req.query.name }}).then( recipe => 
    res.send(recipe) );
});

// 새로운 레시피의 정보를 추가합니다.    ??왜 안됨??? fk있으면 fk문제 저거 지우면 UnhandledPromiseRejectionWarning로 뜸 
recipeController.post('/', (req: express.Request, res: express.Response) => {
  try {
    Recipe.create(
      { 
        Recipe_name:req.body.name,
        User_id:req.body.User_id,
        Bread_id:req.body.Bread_id,
        Menu_id:req.body.Menu_id, 
        Recipe_dateCreated:req.body.date
      }
    )
    res.send('success');
  } catch (error){
    res.status(400).send(error);
  }
});

// 한 유저가 하나의 레시피 메뉴의 이름을 수정한다. 
recipeController.patch('/:id', (req: express.Request, res: express.Response) => {
  try {
    Recipe.update({Recipe_name: req.body.name },{where: {User_ID:req.params.id, Recipe_name:req.query.name}});
    res.send('update success');
  } catch(error){
    res.status(400).send(error);
  }
});

interface bread {
  Bread_id: number;
  Bread_name: string;
  Bread_calorie: number;
  Bread_imageUrl: string;
}
// 한 유저가 하나의 레시피의 빵 수정한다. 
 recipeController.patch('/', async (req: express.Request, res: express.Response) => {
  /* 
  Recipe.findOne({where: {Bread_name: req.query.name}}).then( b => {
      if(b?.toJSON()){
        const bread:bread = b!.toJSON();
        Recipe.update({Bread_id: bread.Bread_id },{where: {Recipe_ID:req.params.id}})
      } else {
        res.status(404).send(`${req.query.name} is not exist.`); }
      
    });
    // if(!breadName){  }
    // console.log(breadName!.dataValues);
    
    
     .then(client => {
         res.json(client)
     }); 
     */
 })
// 선택한 레시피의 정보를 삭제합니다.
 recipeController.delete('/:recipeId', (req: express.Request, res: express.Response) => {
     Recipe.destroy({
         where: {Recipe_id : req.params.id}
     }).then(client =>
         res.json(client)
     );
 })

export default recipeController;