
let dataProducts = [];

//CONTROLLERS
//Main page
export const mainController = (req, res) => {
    if(dataProducts.length > 0) {
        res.status(200).json(dataProducts);
    } else {
        res.status(200).send("<h1 style='text-align: center; padding: 0px 15px; margin-top: 1.5rem; font-size: calc(1.425rem + 2.1vw); font-weight: 300; line-height: 1.2'>Favor ingrese algún producto, yendo a la ruta /api/productos.html</h1>");
    }
};

//añadir producto - POST
export const addProd = (req, res) => {
    let objectId = 0;
    const { nombre, price, url } = req.body;
    if(dataProducts.length == 0) {
        objectId = 1;
    } else {
        let arr = [];
        dataProducts.forEach(item => {
            arr.push(item.id);
        });

        const maxValue = Math.max(...arr);
        objectId = maxValue + 1;
    };

    let newProduct = {
        id: objectId,
        nombre,
        price: Number(price),
        url
    };

    dataProducts.push(newProduct);
    res.status(201).redirect('/api/productos');
};

//Buscar prod por ID
export const singleProduct = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length > 0) {
        if(!isNaN(id)) {
            const product = dataProducts.find(data => data.id == id);
            if(product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado!'});
            }
        } else {
            res.status(400).json({ error: 'El ID debe ser un número!'});
        }
    } else {
        res.status(404).json({error: 'No se cuenta con ningun producto registrado'});
    }
};

//Actualizar prod por su ID
export const updateProd = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length > 0) {
        if(!isNaN(id)) {
            const product = dataProducts.find(data => data.id == id);
            const newArray = dataProducts.filter(data => data.id !== id);
            if(product) {
                const { nombre, price, url } = req.body;
                let productToUpdate = {
                    id,
                    nombre,
                    price: Number(price),
                    url
                };
    
                dataProducts = [...newArray, productToUpdate];
                res.status(200).send('Producto actualizado!');
            } else {
                res.status(404).json({ error: 'Producto no encontrado!'});
            };
        } else {
            res.status(400).json({ error: 'El ID debe ser un número!'});
        };
    } else {
        res.status(404).json({error: 'No se cuenta con productos para actualizar'});
    }
};

//Borrar prod por su ID
export const deleteProd = (req, res) => {
    const id = Number(req.params.id);
    if(dataProducts.length > 0) {
        if(!isNaN(id)) {
            const newAllProducts = dataProducts.filter(data => data.id !== id);
            dataProducts = newAllProducts;
            res.status(200).send('Producto eliminado!');
        } else {
            res.status(400).json({ error: 'ID debe ser un numero!'});
        };
    } else {
        res.status(404).json({error: 'No se cuenta con productos para eliminar'});
    };
};