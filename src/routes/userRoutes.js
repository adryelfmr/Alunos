import { Router } from "express";
import userController from "../controllers/UserController"
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

//nao deveria existir
router.get('/', userController.index) //lista usuario
// router.get('/:id', userController.show) //lista usuario

router.post('/', userController.store)
router.put('/', loginRequired, userController.update)
router.delete('/', loginRequired ,userController.delete)

export default router;


/*
index -> lista todos os usuarios -> GET
store/create -> cria um novo usuario -> POST
delete -> apaga um usuario -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuario -> PATCH ou PUT
*/
