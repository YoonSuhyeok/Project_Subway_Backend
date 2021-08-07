
import express from 'express';
import {Recipe} from '../models/Recipe';
import {Choice_Ingredient} from '../models/Choice_Ingredient';

const recipeController: express.Router = express.Router();

// 모든 유저의 조합식을 본다.
recipeController.get('/', (req: express.Request, res: express.Response) => {
  Recipe.findAll().then( recipe => res.json(recipe) );
});

// 한 유저가 하나의 레시피 조회한다. 
recipeController.get('/', (req: express.Request, res: express.Response) => {
  Recipe.findOne({ where: {User_id : req.query.id, Recipe_name: req.query.name }}).then( recipe => 
    res.send(recipe) );
});
// 한 유저가 하나의 레시피 조회한다. 
recipeController.get('/', (req: express.Request, res: express.Response) => {
  Recipe.findOne({ 
    where: {User_id : req.query.id, Recipe_name: req.query.name }
  }).then( recipe => 
    res.send(recipe) );
});

//RecipeID로 그 레시피의 모든 정보(recipe+ingredient)를 가져온다.
recipeController.get('/:id', async (req: express.Request, res: express.Response) => {
  const ingredient= [];
  //레시피의 정보를 레시피id로 검색
  const recipe = await Recipe.findAll({
    where: {"Recipe_id" : req.params.id}
  })
  //재료정보를 레시피id로 검색
  const choice = await Choice_Ingredient.findAll({
    where: {'Recipe.id': req.params.id}
  })
  //ingredient 배열에 가져온 재료정보의 id를 넣습니다
  for(let i=0; i< choice.length; i++){
    ingredient.push(choice[i]['Ingredient.id'])
  }
  res.send({
    recipe,
    ingredient: ingredient
  })
});

// 새로운 레시피의 정보를 추가합니다.   
recipeController.post('/', async (req: express.Request, res: express.Response) => {
  try {
    //recipe(소문자)에 레시피정보를 저장
    const recipe =await Recipe.create(
      { 
        Recipe_name:req.body.Recipe_name,
        User_id:req.body.User_id,
        Bread_id:req.body.Bread_id,
        Menu_id:req.body.Menu_id, 
        Recipe_dateCreated:req.body.date
      }
    )
  //body에 들어가는 ingredient정보를 ingredient에 숫자배열임을 선언하고 넣습니다.
   const ingredient: Array<number> = req.body.ingredient;
   //이번에 만들어지는 recipe의 id정보와 
  /*
   Choice_Ingredient.create({
      "Recipe.id": recipe.Recipe_id, "Ingredient.id" :  req.body.ingredient
    })
  */
    for (let i=0; i<ingredient.length; i++) {
      console.log(ingredient[i]);
       Choice_Ingredient.create({
        "Recipe.id": recipe.Recipe_id, "Ingredient.id" : ingredient[i]
      })
    }
    res.send('success');
  } catch (error){
    res.status(400).send(error);
  }
});
      
// 한 유저가 하나의 레시피 메뉴의 이름을 수정한다. 
recipeController.patch('/:id', (req: express.Request, res: express.Response) => {
  try {  
    Recipe.update({Recipe_name: req.body.name },{where: {User_id:req.params.id, Recipe_name:req.query.name}});
    res.send('update success');
  } catch(error){
    res.status(400).send(error);
  }
});

// 선택한 레시피의 정보를 삭제합니다.
 recipeController.delete('/:recipeId', (req: express.Request, res: express.Response) => {
     Recipe.destroy({
         where: {Recipe_id : req.params.id}
     }).then(client =>
         res.json(client)
     );
 })

export default recipeController;