
import express from 'express';
import Bread from '../models/Bread';

const breadController: express.Router = express.Router();
//모든 빵의 정보를 가져옵니다.
breadController.get('/', (req: express.Request, res: express.Response) => {
    Bread.findAll().then( client =>
            res.json(client)
        );
})
//특정한 빵의 id를 검색하여 그 정보를 가져옵니다.
breadController.get('/:id', (req: express.Request, res: express.Response) => {
    Bread.findOne({
        where: {Bread_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})
//새로운 빵의 정보를 입력합니다.
breadController.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const bread = await Bread.create({ Bread_id:req.body.id, Bread_name:req.body.name, Bread_calorie:req.body.calorie, Bread_imageUrl:req.body.url })
    res.send(bread);
  } catch (error){
    res.status(400).send(error);
  }
})

export default breadController;