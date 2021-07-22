
import express from 'express';
import { Extra } from '../models/Extra';

const extraController: express.Router = express.Router();
//모든 빵의 정보를 가져옵니다.x
extraController.get('/', (req: express.Request, res: express.Response) => {
    Extra.findAll().then( i =>
        res.json(i));
})
//특정한 빵의 id를 검색하여 그 정보를 가져옵니다.
extraController.get('/:id', (req: express.Request, res: express.Response) => {
    Extra.findOne({
        where: {Extra_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})

export default extraController;