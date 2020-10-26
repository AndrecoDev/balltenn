const productController = require("express").Router();
const productService = require("../../services/onlineStore/product.service");
const authService = require("../../services/auth.service");
const Role = require("../../helpers/role.enum");

productController.get("/", async function (req, res, onError) {
    try {
        let products = await productService.getAll();
        res.status(200).json(products);
    } catch (error) {
        onError(error);
    }
});

productController.get("/:id", async function (req, res, onError) {
    try {
        const product = await productService.getById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

productController.post("/", async function (req, res, onError) {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const imagesUploaded = await productService.saveImages(req.files.images)
        if (imagesUploaded) {
            const data = { ...req.body, images: imagesUploaded }
            let product = await productService.create(data);
            res.status(200).json(product);
        }
    } catch (error) {
        onError(error);
    }
});

productController.put("/", async function (req, res, onError) {
    try {

        if (req.body._id == req.product._id) {
            let { type, ...productToUpdate } = req.body;

            let product = await productService.update(productToUpdate, req.product._id);

            if (product) {
                res.status(200).json(product);
            } else {
                res.sendStatus(304);
            }

        } else {
            onError({
                id: "unauthorized",
                message: "Unauthorized"
            });
        }

    } catch (error) {
        onError(error);
    }
});

productController.delete("/:id", authService.authorize(Role.ADMIN), async function (req, res, onError) {
    try {
        const deleted = await productService.delete(req.params.id, req.product._id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

productController.get("/category/:id", async function (req, res, onError) {
    try {
        const products = await productService.getByCategory(req.params.id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

module.exports = productController;