 /* class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    } 
    getFullName (){
        console.log(`${this.nombre} ${this.apellido}`);
        return `${this.nombre} ${this.apellido}`;
    } 

    addMascota (mascota){
        this.mascotas.push(mascota)
    }
    countMascotas (){
        let cantMascotas = this.mascotas.length;
        console.log(cantMascotas);
        return parseInt(cantMascotas)
    }
    addBook (nombre, autor){
        this.libros.push({nombre:nombre, autor:autor})
    } 
    getBookNames(){
        const titulos = this.libros.map(item=> item.nombre)
        console.log(titulos);
        return titulos;
    }
}

const usuario = new Usuario ("Jorge", "Juarez", [{nombre:'El señor de los anillos',autor:'JRR Tolkien'},
{nombre:'El Alquimista',autor:'Paulo Coelho'}],['perro','gato', 'hamster']);

usuario.getFullName()
usuario.addMascota('conejo');
usuario.countMascotas();
usuario.addBook('El codigo Da Vinci', 'Dan Brown');
usuario.getBookNames(); 
 */

 //codigo para entrega de "manejo de archivos"
/* 
 const fs = require('fs')
 class Contenedor {
     constructor(fileName) {
         this.fileName = fileName
         fs.promises.writeFile(`./${fileName}`, '')
     }
     async save(objeto) {
         let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
         if(!data) {
             objeto.id = 1
             const arr = [objeto]
             await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr))
             return objeto.id
         } else {
             data = JSON.parse(data);
             objeto.id = data.length + 1
             data.push(objeto)
             await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
             return objeto.id
         }
     }
 
    
    getById(){

    }

    getAll(){

    }

    deleteById(){

    }

    deleteAll(){

    }

 }
 const productos = new Contenedor('productos.txt') */

 const fs = require('fs')


class Contenedor{
    constructor(rutaArchivo){
        this.nombre= rutaArchivo;
        fs.promises.writeFile(`./${rutaArchivo}`,"")
    }
   
    async save(objeto){
        try {
        let data = await fs.promises.readFile(this.nombre)
        if(data.length ==0){
            let id = {'id': 1}
            let newObject=Object.assign(objeto,id)
            const jsonData = [newObject]
            await fs.promises.writeFile(this.nombre ,JSON.stringify(jsonData))
            return id
        }else{    
            const contenido = JSON.parse(data)
            let lastIndex= contenido.length
            let num= lastIndex-1
            let newId= lastIndex+1
            let newObject=Object.assign(objeto,{'id':newId})
            contenido.push(newObject)
            await fs.promises.writeFile(this.nombre, JSON.stringify(contenido))
            return newId
        }
  
        } catch (error) {
            console.log("ERROR")
            console.log(error)    
        }
       
    }
    async load(){
       return JSON.parse(await fs.promises.readFile( this.nombre ,'utf-8'))
    }
    async getById(id){
        try {
            const contenido = await this.load()
            let objeto = contenido.find(el=>el.id==id)
            if(objeto== undefined){return null} 
            return objeto
        } catch (error) {
            console.log(`Error en getById:${error}`)
        }
        
    }
    async getAll(){
        try {
            const contenido = await this.load()
            return contenido
        } catch (error) {
            console.log(`Error en getAll:${error}`)
        }
    }
    async deleteById(id){
        try {
            const contenido = await this.load()
            let objeto = contenido.filter(item=>item.id=id)
            await fs.promises.writeFile(this.nombre,JSON.stringify(objeto))          
            
        } catch (error) {
            console.log(`Error en deleteById:${error}`)
        }
    }
    
    async deleteAll(){
        try {
            await fs.promises.writeFile( this.nombre,"") 
        } catch (error) {
            console.log(`Error en deleteAll:${error}`)
        }
         
    }

}

const product =new Contenedor('productos.txt')

async function test(){
    
    let idProduct = await product.save(
        {                                                                                                                                                    
        'title': 'Escuadra',                                                                                                                                 
        'price': 123.45 ,
        'url': 'https://es.pngtree.com/so/calculadora-de-dibujos-animados'                                                                                                                               
      }
    )

    console.log("Guardado:", idProduct)
    let idProduct2 = await product.save(
        {                                                                                                                                                    
        'title': 'cuadra',                                                                                                                                 
        'price': 123.45 ,
        'url': 'https://es.pngtree.com/so/calculadora-de-dibujos-animados'                                                                                                                               
      }
    )
    console.log("Guardado:", idProduct2)  

    let idProduct3 = await product.save(
        {                                                                                                                                                    
        'title': 'dra',                                                                                                                                 
        'price': 123.45 ,
        'url': 'https://es.pngtree.com/so/calculadora-de-dibujos-animados'                                                                                                                               
      }
    )
    console.log("Guardado:", idProduct3)

    let productById = await product.getById(2)
    console.log("getById:", productById)
    
    let productgetAll= await product.getAll()
    console.log("getAll", productgetAll)

    let productdeleteById = await product.deleteById(1)
    console.log(`productdeleteById: ${productdeleteById}`)

    let productById2 = await product.getById(1)
    console.log("getById:", productById2)

    //let productdeleteById2 = await product.deleteById(1)
    //console.log(`productdeleteById: ${productdeleteById2}`) 

    //let productdeleteAll= await product.deleteAll()
    //console.log(`productdeleteAll: ${productdeleteAll}`)
    
}

test()
