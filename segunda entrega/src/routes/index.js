import { Router } from 'express';
const router = Router()
import { getProductos, postProductos, getProductoId, 
            putProduct,deleteProduct} from '../controllers/productsController.js'

import { postCarrito, deleteCarrito, listarCarritos, verCarrito} from '../controllers/cartController.js'

//Rutas Productos
router.get('/productos', getProductos)
router.get('/productos/:id', getProductoId)
router.post('/productos', postProductos)
router.put('/productos/:id', putProduct)
router.delete('/productos/:id', deleteProduct )
// router.get('/productos', mostrarForm)

//Rutas Carrito
router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito )
router.get('/carrito', listarCarritos)
router.get('/carrito/:id/productos', verCarrito)


export default router