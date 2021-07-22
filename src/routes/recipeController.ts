
<<<<<<< HEAD
const Recipe = sequelize.define('Recipe', {
    // Model attributes are defined here
    Recipe_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      Recipe_name: {
        type: DataTypes.STRING(18),
        allowNull: false
      },
      User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'User_id'
        }
      },
      Menu_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Menu',
          key: 'Menu_id'
        }
      },
      Bread_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Bread',
          key: 'Bread_id'
        }
      },
      Recipe_dateCreated: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      tableName: 'Recipe',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "Recipe_id" },
            { name: "User_id" },
            { name: "Menu_id" },
            { name: "Bread_id" },
          ]
        },
        {
          name: "fk_Recipe_Bread_id",
          using: "BTREE",
          fields: [
            { name: "Bread_id" },
          ]
        },
        {
          name: "fk_Recipe_Menu_id",
          using: "BTREE",
          fields: [
            { name: "Menu_id" },
          ]
        },
        {
          name: "fk_Recipe_User_id",
          using: "BTREE",
          fields: [
            { name: "User_id" },
          ]
        },
      ]
  });
//Recipe.hasOne(User)   
=======
import express from 'express';
import { Bread } from '../models/Bread';
// import Bread  from '../models/Bread';
import {Recipe} from '../models/Recipe';
>>>>>>> 84e56901a0109c4a063a124eef0301c4c0c32d59
  
const recipeController: express.Router = express.Router();

// 모든 유저의 조합식을 본다.
recipeController.get('/', (req, res) => {
  Recipe.findAll().then( recipe => res.send(recipe) );
});

// userID로 그 유저의 모든 레시피정보를 가져온다.
recipeController.get('/:id', (req, res) => {
  // Recipe.findAll({ where: {User_id : req.params.id }}).then( recipe =>
  //   res.send(recipe) );
});

// 한 유저가 하나의 레시피 조회한다. /userId?name=에그마요   연구연구
recipeController.get('/:id', (req, res) => {
  Recipe.findOne({ where: {User_id : req.params.id, Recipe_name: req.query.name }}).then( recipe => 
    res.send(recipe) );
});

// 새로운 레시피의 정보를 추가합니다.    ??왜 안됨??? fk있으면 fk문제 저거 지우면 UnhandledPromiseRejectionWarning로 뜸 
<<<<<<< HEAD
recipeController.post('/', (req: express.Request, res: express.Response) => {
    Recipe.create({
        Recipe_id:req.body.Recipe_id, Recipe_name:req.body.Recipe_name, User_id:req.body.User_id, Menu_id:req.body.Menu_id, Bread_id:req.body.Bread_id, Recipe_dateCreated:req.body.Recipe_dateCreated
   }).then(client =>
        res.json(client)
   );    
})
=======
recipeController.post('/', (req, res) => {
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
>>>>>>> 84e56901a0109c4a063a124eef0301c4c0c32d59

//한 유저가 하나의 레시피 메뉴의 이름을 수정한다. 
recipeController.patch('/:id', (req, res) => {
  try {
    Recipe.update({Recipe_name: req.body.name },{where: { Recipe_name:req.query.name, User_id:req.params.id,}});
    res.send('update success');
  } catch(error){
    res.status(400).send(error);
  }
});

// 한 유저가 하나의 레시피의 빵 수정한다. 
 recipeController.patch('/:id/bread', async (req, res) => {
    const bread = await Bread.findOne({where: { Bread_name: req.query.name } })
    
 })

// 선택한 레시피의 정보를 삭제합니다.
 recipeController.delete('/:recipeId', (req, res) => {
    //  Recipe.destroy({
    //      where: {Recipe_id : req.params.id}
    //  }).then(client =>
    //      res.json(client)
    //  );
 })


export default recipeController;
