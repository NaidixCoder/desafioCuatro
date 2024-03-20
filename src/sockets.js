import ProductManager from "./controllers/productManager.js";
import { productDB } from "./config/config.js";

export default (io) => {
    const PM = new ProductManager(productDB);

    io.on("connection", handleConnection);

    async function handleConnection(socket) {
        console.log(`Nuevo cliente conectado ${socket.id}`);
        emitProducts(socket);

        socket.on("add", async (product) => {
        await addProductAndEmit(product);
        });

        socket.on("delete", async (id) => {
        console.log("ID del producto a eliminar:", id);
        await deleteProductAndEmit(id);
        });
    }

    async function emitProducts(socket) {
    const productsList = await PM.getProducts();
    
    productsList.forEach((product) => {
        if (!product.thumbnail || product.thumbnail.length === 0) {
            product.thumbnail = ["img/no-image.jpg"];
        }
    });
    
    socket.emit("products", productsList);
    }

    async function addProductAndEmit(product) {
    await PM.addProduct(product);
    emitProducts(io);
    }

    async function deleteProductAndEmit(id) {
    await PM.deleteProduct(id);
    emitProducts(io);
    }
};
