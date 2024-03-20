import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PORT = 8080;
export const productDB = `${__dirname}/../models/products.json`;
export const cartDB = `${__dirname}/../models/carts.json`;

