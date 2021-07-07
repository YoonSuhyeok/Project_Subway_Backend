import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();



import { sequelize } from '../models/index';
import { URLSearchParams } from 'node:url';
import { timeStamp } from 'node:console';
const {Sequelize,DataTypes} =require('sequelize');

const Allergy = sequelize.define('Allergy', {
    // Model attributes are defined here
    Allergy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Allergy_name: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
  }, {
    // Other model options go here
    tableName: 'Allergy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Allergy_id" },
        ]
      },
    ]
  });

const alleryController: express.Router = express.Router();
//모든 알러지의 정보를 가져옵니다.
alleryController.get('/', (req: express.Request, res: express.Response) => {
    Allergy.findAll().then( client =>
        res.json(client)
    );
})
//특정한 id의 알러지정보를 가져옵니다.
alleryController.get('/:id', (req: express.Request, res: express.Response) => {
    Allergy.findOne({
        where: {Allery_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})
//새로운 알러지 정보를 입력합니다. 
alleryController.post('/', (req: express.Request, res: express.Response) => {
    // DB에 auto_increment로 했음 좋겠습니다.
    Allergy.create({
        Allergy_id:req.body.id, Allergy_name:req.body.name
   }).then(client =>
        res.json(client)
   ); 
})
//선택한 알러지id의 정보(이름)를 수정합니다. 
alleryController.patch('/:id', (req: express.Request, res: express.Response) => {
    Allergy.update({Allergy_name: 'allergy'},{where: {Allergy_ID:req.params.id}})
    .then(client => {
        res.json(client)
    });
})
//선택한 id의 알러지를 제거합니다.
alleryController.delete('/:id', (req: express.Request, res: express.Response) => {
    Allergy.destroy({
        where: {Allergy_id : req.params.id}
    }).then(client =>
        res.json(client)
    );
})
//connection.end();

export default alleryController;