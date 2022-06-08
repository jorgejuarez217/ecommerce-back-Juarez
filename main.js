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

 //const fs = require('fs');
import fs from 'fs'

class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo= rutaArchivo;
       // fs.promises.writeFile(`./${rutaArchivo}`,"")
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
          console.log(data);
          return data[index]
    }

    //ok
    async getAll(){
            let data = JSON.parse(await fs.promises.readFile(`./${this.rutaArchivo}`, 'utf-8'))
            console.log(data)
            return data
    
}
    async deleteById(id){
        try {
            let contenido = JSON.parse( await fs.promises.readFile(`./${this.rutaArchivo}`, 'utf-8'))
            contenido = contenido.filter(item=> item.id != id)        
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

    async getRandom() {
		try {
			let dataProd = await fs.promises.readFile(`./${this.rutaArchivo}`, 'utf-8')
			dataProd = JSON.parse(dataProd)
			const productRandom = dataProd[Math.floor(Math.random() * dataProd.length)]

			return productRandom
		} catch {
			console.log('Error no se puede leer el archivo')
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


// codigo para desafio de servidores con express

import express from 'express'
const app = express();
const puerto = 8080;

/* const productoRandom = async (req, res) => {
	const respuesta = await product.getRandom()
	res.send(respuesta)
}
 */
const listaProd = async (req, res) => {
	const respuesta = await product.getAll()
	res.send(respuesta)
}

app.get('/', () =>{
    res.send('<h1> Bienvenido al servidor </h1>')
})
 app.get('/productos', listaProd)
//app.get ('/productoRandom', productoRandom)


app.listen(puerto, error =>{
    if(error){
        console.log('Se produjo un error al conectar al servidor');
    }else{
        console.log(`Servidor conectado en el puerto : ${puerto}`);
    }
})


