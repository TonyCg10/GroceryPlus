// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// import * as path from 'path';

// const __dirname = path.resolve();

// const envFilePath = path.join(__dirname, '.env');

// if (fs.existsSync(envFilePath)) {
//     dotenv.config({ path: envFilePath });
// }

// export const IP = process.env.ENV_IP;
// export const IP = '127.0.0.1'
export const IP = '10.0.0.139'
// export const PORT = process.env.ENV_PORT;
export const PORT = 8000

export const URL = `http://${IP}:${PORT}`;
export const USER = 'groceryplus/users';
export const PRODUCT = 'groceryplus/products';
export const ORDER = 'groceryplus/orders';
export const PAYMENT = 'groceryplus/payments';
