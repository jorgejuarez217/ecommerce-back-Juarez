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

 //codigo para entrega de desafio "manejo de archivos"

 const fs = require('fs')

class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo= rutaArchivo;
        fs.promises.writeFile(`./${rutaArchivo}`,"")
    }
    async save(objeto) {
        let data = await fs.promises.readFile(`./${this.rutaArchivo}`, 'utf-8')
        if(!data) {
            objeto.id = 1
            const array = [objeto]
            await fs.promises.writeFile(`./${this.rutaArchivo}`, JSON.stringify(array))
            return objeto.id
        } else {
            data = JSON.parse(data);
            objeto.id = data.length + 1
            data.push(objeto)
            await fs.promises.writeFile(`./${this.rutaArchivo}`, JSON.stringify(data))
            return objeto.id
        }
    }
        
    
    //ok
    async getById(id){
          const data = JSON.parse(await fs.promises.readFile(`./${this.rutaArchivo}`, 'utf-8'))
          const index = id -1 
          return data[index]
    }

    //ok
    async getAll(){
        try{
            let data = JSON.parse(await fs.promises.readFile(`./${this.rutaArchivo}`, 'utf-8'))
            return data
    }
    catch (error){
        console.log(error);
    }
}
    async deleteById(id){
        try {
            let contenido = await this.load()
            contenido = JSON.parse(contenido)
            contenido = contenido.find(item=> item.id != id)
            await fs.promises.writeFile(this.nombre,JSON.stringify(objeto))          
            
        } catch (error) {
            console.log(`Error en deleteById:${error}`)
        }
    }
    // ok
    async deleteAll(){
        try {
            await fs.promises.writeFile( this.rutaArchivo,[]) 
        } catch (error) {
            console.log(`Error en deleteAll:${error}`)
        }
         
    }

}

 const product = new Contenedor('productos.txt')

const obj1 = {
    title: 'celular',                                                                                                                                 
    price: 18000 ,
    url: 'https://i.pinimg.com/236x/9c/d9/5d/9cd95d443475b7ff5ecb81b08fc66215.jpg'
}
const obj2 = {
    title: 'notebook',                                                                                                                                 
    price: 65000 ,
    url: 'https://i.blogs.es/f32047/xiaomi-mi-notebook/1366_2000.jpg'  
}
product.save(obj1, obj2)