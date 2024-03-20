import { Router } from "express";
import ProductManager from "../controllers/productManager.js";
import { productDB } from "../config/config.js";

const pm = new ProductManager(productDB);
const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await pm.getProducts();

        res.render("home", {
            title: "Desafio Infante Matias",
            logo: 'headerLogo-white.png',
            styles: "styles.css",
            products: products,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await pm.getProducts();

        res.render("realtimeproducts", {
            title: "Desafio Infante Matias",
            logo: 'headerLogo-white.png',
            styles: "styles.css",
            products: products,
        });
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

export default router;

