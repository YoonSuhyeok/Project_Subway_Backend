import express from 'express';
import Menu from '../models/Menu';

const MenuController: express.Router = express.Router();
//Menu에 있는 모든 정보를 가져옵니다.
MenuController.get('/', (req: express.Request, res: express.Response) => {
    Menu.findAll().then( client =>
        res.json(client)
    );
})
//Menu중 선택한 Menu_id의 정보를 가져옵니다.
MenuController.get('/:id', (req: express.Request, res: express.Response) => {
    Menu.findAll({
        where: {Menu_category : req.params.id}
    }).then( client =>
        res.json(client)
    );
})

export default MenuController;