import dotenv from "dotenv";
import path from'path';

const envFile = path.join(process.cwd(), './src/.env')
console.log('envFile',envFile )
dotenv.config({ path: envFile });
console.log('database',process.env.DATABASE )

let ProductoDao;
let CarritoDao;

console.log('database-Dao',process.env.DATABASE )

switch (process.env.DATABASE) {
  case "firebase":
    const { default: ProductoDaoFirebase } = await import(
      "./productos/productoDaoFirebase.js"
    );
    const { default: CarritoDaoFirebase } = await import(
      "./carritos/carritoDaoFirebase.js"
    );

    ProductoDao = new ProductoDaoFirebase;
    CarritoDao = new  CarritoDaoFirebase;

    break;
  case "mongo":
    const { default: ProductoDaoMongo } = await import(
      "./productos/productoDaoMongo.js"
    );
    const { default: CarritoDaoMongo } = await import(
      "./carritos/carritoDaoMongo.js"
    );

    ProductoDao = new ProductoDaoMongo;
    CarritoDao = new CarritoDaoMongo;
 
    break;
}

export { ProductoDao, CarritoDao };