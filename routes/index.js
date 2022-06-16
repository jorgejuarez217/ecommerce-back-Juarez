import {Router} from 'express'
const router = Router();
import { mainController, addProd, singleProduct, updateProd, deleteProd } from '../controllers/controller.js'


router.get('/api/productos', mainController)

router.get('/api/productos/:id', singleProduct)

router.post('/api/productos', addProd)

router.put('/api/productos/:id', updateProd)

router.delete('/api/productos/:id', deleteProd)



export default router;
