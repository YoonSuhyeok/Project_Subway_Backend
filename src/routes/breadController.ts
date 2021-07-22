
import express from 'express';
import { Bread } from '../models/Bread';

const breadController: express.Router = express.Router();
//모든 빵의 정보를 가져옵니다.x
breadController.get('/', (req: express.Request, res: express.Response) => {
    Bread.findAll().then( i =>
        res.json(i));
    // Bread.findAll().then( client =>
    //         res.json(client)
    //     );
})
//특정한 빵의 id를 검색하여 그 정보를 가져옵니다.
breadController.get('/:id', (req: express.Request, res: express.Response) => {
    Bread.findOne({
        where: {Bread_id : req.params.id}
    }).then( client =>
        res.json(client)
    );
})

export default breadController;